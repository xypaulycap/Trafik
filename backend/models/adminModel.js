import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    date: { type: Date, default: Date.now },
});

const adminModel = mongoose.models.admin || mongoose.model('Admin', adminSchema);

export default adminModel; 