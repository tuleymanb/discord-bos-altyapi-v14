import * as dotenv from 'dotenv';

dotenv.config();

export default {
    mongoURL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority&authSource=admin`,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        pass: process.env.REDIS_PASS,
        db: process.env.REDIS_DB,
        prefix: process.env.REDIS_PREFIX
    }
}