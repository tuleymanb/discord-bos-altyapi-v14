import fs from "fs";
import settings from "../../../config/bot/example.settings.js";

const allSlashCommands = [];

export default async (client) => {

    const guildId = settings.support.id;
    
    try {
        fs.readdirSync("./src/commands/support/").forEach(async (dir) => {
            const commands = fs.readdirSync(`./src/commands/support/${dir}/`).filter((file) => file.endsWith(".js"))
            for await (const file of commands) {
                const command = await import(`../../commands/support/${dir}/${file}`)
                if (command.config.name && command.config.description) {
                    // console.log(command)
                    allSlashCommands.push(command.config)
                    client.slashCommands.set(String(command.config.name).replace(/\s+/g, '_').toLowerCase(), command)
                } else {
                    console.log(file, "command name, description or type empty")
                    continue;
                }
                // console.log(client.slashCommands)
            }
        });
    } catch (err) {
        console.log(err)
    }

    client.once("ready", async (client) => {
        const supportServer = await client.guilds.cache.get(guildId)
        supportServer.commands.set(allSlashCommands)
            .then(slashCommandsData => {
                // console.log(slashCommandsData)
            }).catch((e)=>console.log(e));
    });

}