import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    movementType: {
      type: String,
      enum: ["entrada", "salida"],
      required: true,
    },
    usedQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StockMovement", stockMovementSchema);