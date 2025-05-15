import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
});

// Ensure subcategory names are unique within a category
subcategorySchema.index({ name: 1, category: 1 }, { unique: true });

export default mongoose.model('Subcategory', subcategorySchema); 