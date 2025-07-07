import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    prices: {
        type: new mongoose.Schema({
            regular: {
                type: Number,
                required: [true, 'Regular price is required'],
                min: [0, 'Price cannot be negative']
            },
            vip: {
                type: Number,
                required: [true, 'VIP price is required'],
                min: [0, 'VIP price cannot be negative']
            }
        }, { _id: false }),
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: [true, 'Subcategory is required']
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Menu = mongoose.models.menu || mongoose.model('Menu', menuSchema);

export default Menu;
