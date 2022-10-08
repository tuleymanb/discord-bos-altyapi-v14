import user from '../../models/user.js';
import guild from '../../models/guild.js';
import { redisHGetAll, redisHMSet } from './redis.js';

export async function rulesAccepted({ userId: userId, username: username, key: key }) {
    // console.log(userId, username, key)
    user.findOne({ id: userId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.id = userId;
            data.rulesAccepted = true;
            data.username = username;
            data.save();
            redisHMSet(key, { rulesAccepted: true, username: username });
        } else {
            new user({
                id: userId,
                username: username,
                createdAt: Date(),
                rulesAccepted: true,
            }).save();
            redisHMSet(key, { rulesAccepted: true, username: username });
        }
    })
}

export async function getRulesAccepted({ userId: userId, username: username, key: key }) {
    let checkRules = await redisHGetAll(key);
    if (Object.entries(checkRules?.rulesAccepted || []).length > 0) {
        return checkRules.rulesAccepted;
    } else {
        const findUser = await user.findOne({ id: userId });
        if (findUser) {
            redisHMSet(key, { rulesAccepted: findUser.rulesAccepted, username: findUser.username });
            return findUser.rulesAccepted;
        } else {
            redisHMSet(key, { rulesAccepted: false, username: username });
            return false;
        }
    }
}

export async function getUser({ userId: userId, key: key }) {
    let checkUser = await redisHGetAll(key);
    // console.log(Object.entries(checkUser?.createdAt || []).length)
    if (Object.entries(checkUser?.createdAt || []).length > 0) {
        return checkUser;
    } else {
        const findUser = await user.findOne({ id: userId });
        if (findUser) {
            redisHMSet(key, { username: findUser.username, createdAt: findUser.createdAt, rulesAccepted: findUser.rulesAccepted, balance: findUser.balance, spentBalance: findUser.spentBalance });
            return findUser;
        } else {
            return null;
        }
    }
}

export async function getPremium({ userId: userId, key: key }) {
    let checkPremium = await redisHGetAll(key);
    if (Object.entries(checkPremium?.level || []).length > 0) {
        return checkPremium;
    } else {
        const findPremium = await user.findOne({ id: userId });
        if (findPremium) {
            redisHMSet(key, { level: findPremium.premium.level, expire: findPremium.premium.expire, active: findPremium.premium.active });
            return findPremium.premium;
        } else {
            redisHMSet(key, { level: 0, expire: "0", active: false });
            return { level: 0, expire: "0", active: false };
        }
    }
}

export async function setPremium({ userId: userId, key: key, level: level, expire: expire, active: active }) {
    user.findOne({ id: userId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.id = userId;
            data.premium = { level: level, expire: expire, active: active };
            data.save();
            redisHMSet(key, { level: level, expire: expire, active: active });
        } else {
            new user({
                id: userId,
                createdAt: Date(),
                premium: { level: level, expire: expire, active: active },
            }).save();
            redisHMSet(key, { level: level, expire: expire, active: active });
        }
    })
}

export async function setBalance({ userId: userId, key: key, balance: balance, spentBalance: spentBalance }) {
    user.findOne({ id: userId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.id = userId;
            data.balance = balance;
            data.spentBalance = spentBalance;
            data.save();
            redisHMSet(key, { balance: balance, spentBalance: spentBalance });
        } else {
            new user({
                id: userId,
                createdAt: Date(),
                balance: balance,
                spentBalance: spentBalance,
            }).save();
            redisHMSet(key, { balance: balance, spentBalance: spentBalance });
        }
    })
}

export async function getRealInfo({ userId: userId, key: key }) {
    const checkReal = await redisHGetAll(key);
    if (Object.entries(checkReal || []).length > 0) {
        return checkReal;
    } else {
        const findReal = await user.findOne({ id: userId });
        if (findReal) {
            redisHMSet(key, { name: findReal.real.name, surname: findReal.real.surname, email: findReal.real.email, phone: findReal.real.phone });
            return findReal?.real;
        } else {
            return null;
        }
    }
}

export function setRealInfo({ userId, key, name, surname, email, phone }) {
    user.findOne({ id: userId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.real = { name: name, surname: surname, email: email, phone: phone };
            data.save();
            redisHMSet(key, { name: name, surname: surname, email: email, phone: phone });
        }
    })
}

export async function getPayment({ userId: userId, key: key }) {
    const checkPayment = await redisHGetAll(key);
    if (Object.entries(checkPayment?.amount || []).length > 0) {
        return checkPayment;
    } else {
        const findPayment = await user.findOne({ id: userId });
        if (findPayment) {
            redisHMSet(key, { amount: findPayment.payment.amount, date: findPayment.payment.date });
            return findPayment?.payment;
        } else {
            return null;
        }
    }
}

export async function setPayment({ userId: userId, key: key, amount: amount, status: status }) {
    user.findOne({ id: userId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.payment = { amount: amount, date: new Date(Date.now() + 120000), status: status };
            data.save();
            redisHMSet(key, { id: userId, amount: data.payment.amount, date: data.payment.date, status: data.payment.status });
        }
    })
}

export async function setPrefix({ guildId: guildId, key: key, prefix: prefix }) {
    guild.findOne({ id: guildId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.prefix = prefix;
            data.save();
            redisHMSet(key, { prefix: prefix });
        } else {
            new guild({
                id: guildId,
                prefix: prefix,
            }).save();
            redisHMSet(key, { prefix: prefix });
        }
    })
}

export async function getPrefix({ guildId: guildId, key: key }) {
    const checkPrefix = await redisHGetAll(key);
    if (Object.entries(checkPrefix?.prefix || []).length > 0) {
        return checkPrefix.prefix;
    } else {
        const findPrefix = await guild.findOne({ id: guildId });
        if (findPrefix) {
            redisHMSet(key, { prefix: findPrefix.prefix });
            return findPrefix.prefix;
        } else {
            return null;
        }
    }
}

export async function setLanguage({ guildId: guildId, key: key, language: language }) {
    guild.findOne({ id: guildId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.language = language;
            data.save();
            redisHMSet(key, { language: language });
        } else {
            new guild({
                id: guildId,
                language: language,
            }).save();
            redisHMSet(key, { language: language });
        }
    })
}

export async function getLanguage({ guildId: guildId, key: key }) {
    const checkLanguage = await redisHGetAll(key);
    if (Object.entries(checkLanguage?.language || []).length > 0) {
        return checkLanguage.language;
    } else {
        const findLanguage = await guild.findOne({ id: guildId });
        if (findLanguage) {
            redisHMSet(key, { language: findLanguage.language });
            return findLanguage.language;
        } else {
            return null;
        }
    }
}

export async function setBlacklist({ id: id, key: key, staff: staff, reason: reason, userr: userr, add: add }) {
    if (userr) {
        if (add) {
            user.findOne({ id: id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.blacklist = { active: true, expire: Infinity, staff: staff, reason: reason };
                    data.save();
                    redisHMSet(key, { active: true, expire: Infinity, staff: staff, reason: reason });
                } else {
                    new user({
                        id: id,
                        blacklist: { active: true, expire: Infinity, staff: staff, reason: reason },
                    }).save();
                    redisHMSet(key, { active: true, expire: Infinity, staff: staff, reason: reason });
                }
            })
        } else if (add === false) {
            user.findOne({ id: id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.blacklist = { active: false, expire: "0", staff:  "unknown", reason:  "unknown" };
                    data.save();
                    redisHMSet(key, { active: false, expire: "0", staff:  "unknown", reason:  "unknown" });
                } else {
                    new user({
                        id: id,
                        blacklist: { active: false, expire: "0", staff: "unknown", reason: "unknown" },
                    }).save();
                    redisHMSet(key, { active: false, expire: "0", staff: "unknown", reason: "unknown" });
                }
            })
        }
    } else if (userr === false) {
        if (add) {
            guild.findOne({ id: id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.blacklist = { active: true, expire: Infinity, staff: staff, reason: reason };
                    data.save();
                    redisHMSet(key, { active: true, expire: Infinity, staff: staff, reason: reason });
                } else {
                    new guild({
                        id: id,
                        blacklist: { active: true, expire: Infinity, staff: staff, reason: reason },
                    }).save();
                    redisHMSet(key, { active: true, expire: Infinity, staff: staff, reason: reason });
                }
            })
        } else if (add === false) {
            guild.findOne({ id: id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.blacklist = { active: false, expire: "0", staff: "unknown", reason: "unknown" };
                    data.save();
                    redisHMSet(key, { active: false, expire: "0", staff: "unknown", reason: "unknown" });
                } else {
                    new guild({
                        id: id,
                        blacklist: { active: false, expire: "0", staff: "unknown", reason: "unknown" },
                    }).save();
                    redisHMSet(key, { active: false, expire: "0", staff: "unknown", reason: "unknown" });
                }
            })
        }
    }
}

export async function getBlacklist({ id: id, key: key, userr: userr }) {
    if (userr) {
        const checkBlacklist = await redisHGetAll(key);
        if (Object.entries(checkBlacklist || []).length > 0) {
            return checkBlacklist;
        } else {
            const findBlacklist = await user.findOne({ id: id });
            if (findBlacklist) {
                redisHMSet(key, { active: findBlacklist.blacklist.active, expire: findBlacklist.blacklist.expire, staff: findBlacklist.blacklist.staff, reason: findBlacklist.blacklist.reason });
                return findBlacklist.blacklist;
            } else {
                return null;
            }
        }
    } else if (!userr) {
        const checkBlacklist = await redisHGetAll(key);
        if (Object.entries(checkBlacklist || []).length > 0) {
            return checkBlacklist;
        } else {
            const findBlacklist = await guild.findOne({ id: id });
            if (findBlacklist) {
                redisHMSet(key, { active: findBlacklist.blacklist.active, expire: findBlacklist.blacklist.expire, staff: findBlacklist.blacklist.staff, reason: findBlacklist.blacklist.reason });
                return findBlacklist.blacklist;
            } else {
                return null;
            }
        }
    }
}