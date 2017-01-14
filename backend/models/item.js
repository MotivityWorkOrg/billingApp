let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let itemSchema = new Schema({
    category: {
        type: String,
        trim: true,
        required: true,
    },
    subCategory: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    itemName: {
        type: String,
        trim: true,
        required: true,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    itemCode: {
        type: String,
        default: null

    },
    imageStream: {
        type: String,
        required: true,
        trim: true
    },
    create: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Item', itemSchema);