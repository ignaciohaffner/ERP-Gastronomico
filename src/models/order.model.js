import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        paymentType: {
            type: String,
            required: true,
        },
        ammount: {
            type: number,
            required: true,
        },
        articles: {
            type: array
        },

    }, {
    timestamps: true
}
);

export default mongoose.model("Order", orderSchema);