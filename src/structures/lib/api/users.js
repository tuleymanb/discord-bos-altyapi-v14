import request from "request";

export default (userId) => {
    try {
        return new Promise((resolve, reject) => {
            request.get(`https://discord.com/api/v10/users/${userId}`, {
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`
                }
            }, function (err, res, body) {
                if (err) return resolve(false);
                if (res.statusCode === 200) return resolve(JSON.parse(body));
                return resolve(false);
            })
        })
    } catch (err) {
        return false;
    }
}