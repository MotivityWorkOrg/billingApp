let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderItemsSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    quantity: {
        type: String,
        trim: true,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('OrderItems', orderItemsSchema);