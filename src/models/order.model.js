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
        deliveryAdress: {
            type: String
        },
        customerName: {
            type: String
        },

    }, {
    timestamps: true
}
);

export default mongoose.model("Order", orderSchema);