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
            type: Map, // Usamos Map para almacenar los ingredientes y sus cantidades
            of: Number // Especificamos que los valores del Map serán de tipo Number (las cantidades)
          },

    }, {
    timestamps: true
}
);

export default mongoose.model("Food", foodSchema);