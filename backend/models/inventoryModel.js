import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["perishable", "non-perishable"],
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Inventory ||
  mongoose.model("Inventory", InventorySchema);
