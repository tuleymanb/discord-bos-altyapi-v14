import * as dotenv from "dotenv";

dotenv.config()

export default {
    token: process.env.BOT_TOKEN,
    prefix: "-", // Bot prefix
    version: "0.0.1", // Bot version
    language: "tr-TR", // tr-TR or en-US
    shard: {
        delay: 5500, // Shard delay
        timeout: -1, // Shard timeout
        totalShards: "auto" // Shard count
    },
    support: {
        id: "", // Support server idy
    },
    presence: {
        status: "dnd", // online, idle, dnd, invisible
        type: "PLAYING", // PLAYING, STREAMING, LISTENING, WATCHING
        text: [ // {guilds} {users} {prefix} {shards} {shardCount} {version} {rulesAccepted}
            "Desc 1",
            "Desc 2",
            "Desc 3",
        ],
        status: true // true or false
    },
    cooldown: {
        default: 5 // Default cooldown
    }
};