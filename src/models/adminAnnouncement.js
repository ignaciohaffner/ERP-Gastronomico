import mongoose from "mongoose";

const adminAnnouncementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        }

    }, {
    timestamps: true
}
);

export default mongoose.model("AdminAnnouncement", adminAnnouncementSchema);