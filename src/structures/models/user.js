import { Schema, model } from "mongoose";

export default model("user", Schema({
    id: { type: String, required: true },
    username: { type: String, default: "unknown#0000" },
    createdAt: { type: String, default: Date() },
    special: { type: Boolean, default: false },
    rulesAccepted: { type: Boolean, default: false },
    balance: { type: Number, default: 0 },
    spentBalance: { type: Number, default: 0 },
    real: {
        name: { type: String, default: "unknown" },
        surname: { type: String, default: "unknown" },
        email: { type: String, default: "unknown" },
        phone: { type: String, default: "unknown" },
    },
    payment: {
        amount: { type: Number, default: 0 },
        date: { type: String, default: Date() },
        merchant_oid: { type: String, default: "unknown" },
        status: { type: String, default: "unknown" },
    },
    premium: {
        level: { type: Number, default: 0 },
        expire: { type: String, default: Date() },
        active: { type: Boolean, default: false },
        history: { type: Array, default: [] },
    },
    blacklist: {
        active: { type: Boolean, default: false },
        reason: { type: String, default: "unknown" },
        staff: { type: String, default: "unknown" },
        expire: { type: String, default: "0" },
    },
    commands: { type: Object, default: {} },
}));