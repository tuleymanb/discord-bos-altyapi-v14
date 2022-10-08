import mongoose from "mongoose";
import database from '../../../config/security/database.js';

const { mongoURL } = database;

export default async (client) => {
    // mongodb veritabanı bağlantısı
    await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connected")
    }).catch((err) => {
        console.log(err)
    })
}