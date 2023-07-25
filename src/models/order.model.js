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
        deliveryAddress: {
            type: String,
            default: "Take Away",
        },
        customerName: {
            type: String
        },
        activeOrder: {
            type: Boolean,
            default: true
        }

    }, {
    timestamps: true
}
);

export default mongoose.model("Order", orderSchema);