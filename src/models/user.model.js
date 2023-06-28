import mongoose from "mongoose";
import { array } from "zod";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'staff'
        },
        dateAdmission: {
            type: Date,
            default: Date.now
        },
        rank: {
            type: String,
            required: true,
        },
        team: {
            type: [String],
        }

    }, {
    timestamps: true
}
);

export default mongoose.model("User", userSchema);