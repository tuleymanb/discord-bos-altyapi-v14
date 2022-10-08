import settings from "../config/bot/example.settings.js";
import { Client } from "discord.js";
const { token } = settings;
const client = new Client({ allowedMentions: { repliedUser: false, parse: [ "roles" ] }, intents: ["Guilds", "GuildMembers","GuildMessages", 'DirectMessages', "MessageContent"] });
["events", "global", "commands", "contextMenuCommands", "slashCommands", "database"].forEach(async h => { await import(`./structures/handlers/${h}.js`).then(function(m) { m.default(client); }) }); //handler loader
client.login(token);