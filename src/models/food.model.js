import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        ingredients: {
            type: Array    
          },

    }, {
    timestamps: true
}
);

export default mongoose.model("Food", foodSchema);