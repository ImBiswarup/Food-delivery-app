const { mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
    },
    nutritionalInfo: {
        calories: {
            type: Number,
        },
        fat: {
            type: Number,
        },
        protein: {
            type: Number,
        },
    },
    rating: {
        type: Number,
    },
    // reviews: [{
    //     user: {
    //         type: String,
    //         required: true,
    //     },
    //     comment: {
    //         type: String,
    //         required: true,
    //     },
    //     rating: {
    //         type: Number,
    //         required: true,
    //     },
    // }],
    tags: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
