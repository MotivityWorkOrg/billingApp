let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let itemSchema = new Schema({
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
        required: true
    }
});