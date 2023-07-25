import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        paymentType: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        articles: {
            type: Array
        },

    }, {
    timestamps: true
}
);

export default mongoose.model("Order", orderSchema);