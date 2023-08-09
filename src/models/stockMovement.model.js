import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      
    },
    quantity: {
      type: Number,
      
    },
    price: {
      type: Number,
      
    },
    movementType: {
      type: String,
      enum: ["entrada", "salida"],
      
    },
    usedQuantity: {
      type: Number,
      default: 0,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StockMovement", stockMovementSchema);