import fs from "fs";

export default async (client) => {
    try {
        fs.readdirSync("./src/commands/normal/").forEach(async (dir) => {
            const commands = fs.readdirSync(`./src/commands/normal/${dir}/`).filter((file) => file.endsWith(".js"))
            for await (const file of commands) {
                const command = await import(`../../commands/normal/${dir}/${file}`)
                if (command.config?.name && command.config?.description) {
                    client.commands.set(command.config.name, command)
                } else {
                    console.log(file, "name or description empty")
                    continue;
                }
                if (command.config.aliases && Array.isArray(command.config.aliases)) command.config.aliases.forEach((alias) => client.aliases.set(alias, command.config.name));
            }
        });
    } catch (err) {
        console.log(err);
    }
}