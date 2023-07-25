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

    }, {
    timestamps: true
}
);

export default mongoose.model("Ingredients", ingredientsSchema);