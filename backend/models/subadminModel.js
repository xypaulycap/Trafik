import mongoose from "mongoose";

const subadminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "subadmin" },
    date: { type: Date, default: Date.now },
})

const subAdmin = mongoose.models.subadmin || mongoose.model('SubAdmin', subadminSchema)
export default subAdmin