import fs from "fs";

const events = [];

export default async (client) => {
    try {
        const loadEvents = async (eventDir) => {
            const eventFiles = fs.readdirSync(`./src/structures/events/${eventDir}`).filter((file) => file.endsWith(".js"));
            for (const file of eventFiles) {
                try {
                    const event = await import(`../events/${eventDir}/${file}`);
                    let eventName = file.split(".")[0];
                    events.push(eventName);
                    client.on(eventName, (...args) => event.default(client, ...args));
                } catch (err) {
                    console.log(err)
                }
            }
        }
        ["client", "guild"].forEach(e => loadEvents(e));
    } catch (err) {
        console.log(err)
    }
}