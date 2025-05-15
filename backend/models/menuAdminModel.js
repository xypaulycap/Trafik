import mongoose from 'mongoose';


const menuAdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "menuadmin" },
    date: { type: Date, default: Date.now },
})

const menuAdmin = mongoose.models.menuadmin || mongoose.model('MenuAdmin', menuAdminSchema);

export default menuAdmin;