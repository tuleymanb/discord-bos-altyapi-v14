import { Schema, model } from "mongoose";
import settings from "../../../config/bot/example.settings.js";

export default model("guild", Schema({
    id: { type: String, required: true },
    special: { type: Boolean, default: false },
    prefix: { type: String, default: settings.prefix },
    language: { type: String, default: settings.language },
    blacklist: {
        active: { type: Boolean, default: false },
        reason: { type: String, default: "unknown" },
        staff: { type: String, default: "unknown" },
        expire: { type: String, default: "0" },
    }
}));