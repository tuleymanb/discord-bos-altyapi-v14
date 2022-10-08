import settings from "../../../../config/bot/example.settings.js";
import user from "../../models/user.js";

export default (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    // değişen bot durum
    if (settings.presence.status) {
        let i = 1;
        setInterval(async () => {
            const getRules = await user.find({})
            client.user.setPresence({
                activities: [
                    {
                        name: settings.presence.text[i++]
                            .replace("{rulesAccepted}", getRules.length.toLocaleString())
                            .replace("{guilds}", client.guilds.cache.size)
                            .replace("{users}", client.users.cache.size)
                            .replace("{prefix}", settings.prefix)
                            .replace("{shards}", client.shard.ids[0]+1)
                            .replace("{shardCount}", client.shard.count)
                            .replace("{version}", settings.version),
                    },
                ],
                status: settings.presence.status,
            });
            if (i >= settings.presence.text.length) i = 0;
        }, 10000);
    }
}