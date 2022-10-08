import Redis from 'ioredis';
import database from '../../../../config/security/database.js';

const { redis: _redis } = database;

const redis = new Redis({
  port: _redis.port, // Redis port
  host: _redis.host, // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: _redis.pass, // Redis password
  db: _redis.db, // Redis database
})

export async function redisSet(table, val) {
    return new Promise(function(res,rej){
        redis.set(_redis.prefix + table,val,
            function(err,val){
                if(err) rej(err);
                    else res(val);
            });
            redisExpire(table, 86400)
    });
}

export function redisGet(key) {
    // console.log(table)
    return new Promise(async function(res,rej) {
        redis.get(_redis.prefix + key,
            function(err,val){
                if(err) rej(err);
                    else res(val);
            }
        );
    });
}


export async function redisHMSet(key, val) {
    return new Promise(function(res,rej){
		redis.hmset(_redis.prefix + key,[val],function(err,val){
			if(err) rej(err);
			else res(val);
		});
        redisExpire(key, 86400)
	});
}

export async function redisExpire(key, time) {
    return new Promise(function(res,rej){
		redis.expire(_redis.prefix + key, time,function(err,val){
			if(err) rej(err);
			else res(val);
		});
	});
}

export function redisHMGet(key) {
    // console.log(table)
    return new Promise(async function(res,rej) {
        redis.hmget(_redis.prefix + key,
            function(err,val){
                if(err) rej(err);
                    else res(val);
            }
        );
    });
}

export function redisHGetAll(key) {
    return new Promise(function(res,rej){
		redis.hgetall(_redis.prefix + key,function(err,val){
			if(err) rej(err);
			else res(val);
		});
	});
}

export function redisLPush(key, val) {
    return new Promise(function(res,rej) {
		redis.lpush(_redis.prefix + key, val,function(err,val) {
			if(err) rej(err);
			else res(val);
		});
	});
}

export function redisDel(key) {
    return new Promise(function(res,rej){
		redis.del(_redis.prefix + key,function(err,val){
			if(err) rej(err);
			else res(val);
		});
	});
}



// module.exports = (client) => {
    redis.on('connect',function(){ console.log("redis connect") });
    redis.on('end', () => { console.log('redis disconnected'); });
    redis.on('reconnecting', () => { console.log('redis reconnecting'); });
    redis.on('error',function(err){
        console.error("Redis error on "+(new Date()).toLocaleString());
        console.error(err);
    });
    
//     setTimeout(() => {
//         client.rdy.redis = false;
//     }, 5000);
// }

// exports.client = redis;