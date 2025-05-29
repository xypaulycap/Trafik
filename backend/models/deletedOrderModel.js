// models/DeletedOrder.js
import mongoose from 'mongoose';

const deletedOrderSchema = new mongoose.Schema({
  code: { type: String, required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  status: { type: String },
  waiterName: { type: String },
  paymentMethod: String,
  createdAt: { type: Date },
  deletedAt: { type: Date, default: Date.now } // Track when deleted
}, { timestamps: true });

const DeletedOrder = mongoose.models.deletedorder || mongoose.model('DeletedOrder', deletedOrderSchema);
export default DeletedOrder;
