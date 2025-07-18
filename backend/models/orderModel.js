import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
        quantity: { type: Number, required: true },
        price: {type: Number, required: true},
        customerType: { type: String, enum: ['regular', 'vip'], required: true },
      },
    ],
    status: { type: String, default: 'pending' }, // pending | accepted | completed
    waiterName: { type: String },
    paymentMethod: String,
    createdAt: { type: Date },
  }, {timestamps: true});

  const Order = mongoose.models.order || mongoose.model('Order', orderSchema);

  export default Order;