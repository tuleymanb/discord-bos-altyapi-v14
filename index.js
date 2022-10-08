import { ShardingManager } from 'discord.js';
import settings from './config/bot/example.settings.js';
const { token, shard: { timeout, delay, totalShards } } = settings;
const manager = new ShardingManager('./src/index.js', { token: token, totalShards: totalShards });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn({ timeout: timeout, delay: delay });