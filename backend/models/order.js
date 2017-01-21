let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderSchema = new Schema({
    items: [{
        type: mongoose.Schema.ObjectId,
        ref: "Item",
        required: "At least one item is required"
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    store: {
        type: mongoose.Schema.ObjectId,
        ref: "Store"
    },
    create: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);