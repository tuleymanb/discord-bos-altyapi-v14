import { Collection } from "discord.js";
import settings from "../../../../../config/bot/example.settings.js";

const { cooldown } = settings;

export default ({ message, command, client, checkPremium }) => {
    if(!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
    if(!command || !command.config.name) throw "No Command with a valid Name granted as Second Parameter";

    if (!client.cooldown.has(command.config.name)) client.cooldown.set(command.config.name, new Collection())

    const now = Date.now();
    const timestamps = client.cooldown.get(command.config.name);
    const cooldownSec = (command.config.cooldown || cooldown) * 1000;
    var cooldownAmount;
    if (Number(checkPremium?.level) === 4) cooldownAmount = cooldownSec - (((cooldownSec) / 100) * 50); // %50
    else if (Number(checkPremium?.level) === 3) cooldownAmount = cooldownSec - (((cooldownSec) / 100) * 40); // %35
    else if (Number(checkPremium?.level) === 2) cooldownAmount = cooldownSec - (((cooldownSec) / 100) * 35); // %20
    else if (Number(checkPremium?.level) === 1) cooldownAmount = cooldownSec - (((cooldownSec) / 100) * 20); // %10
    else cooldownAmount = cooldownSec;

    if (timestamps.has(message.member.id)) {
        const expiration = timestamps.get(message.member.id) + cooldownAmount;
        if (expiration < now) return false;
        const timeLeft = (expiration - now) / 1000;
        return timeLeft;
    } else {
        timestamps.set(message.member.id, now);
        setTimeout(() => { timestamps.delete(message.member.id) }, cooldownAmount);
        return false;
    }
}