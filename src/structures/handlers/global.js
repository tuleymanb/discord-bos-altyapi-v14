import Discord from "discord.js";

export default (client) => {
    client.contextMenuCommands = new Discord.Collection();
    client.slashCommands = new Discord.Collection();
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.cooldown = new Discord.Collection();
}