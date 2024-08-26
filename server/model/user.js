const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    token: { type: String },
    orderedFoods: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
            quantity: { type: Number, required: true }
        }
    ],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
