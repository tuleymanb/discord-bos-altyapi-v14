import { ContextMenuCommandBuilder } from "@discordjs/builders";
import fs from "fs";

const allContextMenu = [];

export default async (client) => {
    
    try {
        fs.readdirSync("./src/commands/context/").forEach(async (dir) => {
            const commands = fs.readdirSync(`./src/commands/context/${dir}/`).filter((file) => file.endsWith(".js"))
            for await (const file of commands) {
                const command = await import(`../../commands/context/${dir}/${file}`)
                if (command.config.name) {
                    // console.log(command)
                    // const contextMenu = new ContextMenuCommandBuilder()
                    //     .setName(command.config.name)
                    //     .setType(command.config.type)
                    // console.log(contextMenu)
                    allContextMenu.push(command.config)
                    client.contextMenuCommands.set(String(command.config.name).replace(/\s+/g, '_').toLowerCase(), command)
                } else {
                    console.log(file, "context name empty")
                    continue;
                }
                
            }
        });
    } catch (err) {
        console.log(err)
    }

    client.once("ready", (client) => {
        client.application.commands.set(allContextMenu)
            .then(contextMenuCommandsData => {
                // console.log(contextMenuCommandsData.name) 
            }).catch((e)=>console.log(e));
    });

}