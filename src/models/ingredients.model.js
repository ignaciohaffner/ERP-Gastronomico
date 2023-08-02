import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
            required: true
        },
        type: {
            type: Object,
        },
        conversion: {
            type: Number,
        },
        stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },


    }, {
    timestamps: true
}
);

export default mongoose.model("Ingredients", ingredientsSchema);