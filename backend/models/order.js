let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.ObjectId,
        ref: "OrderItems",
        required: "At least one item is required"
    }],
    subTotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0.0
    },
    paymentMethod: {
        type: String,
        trim: true,
        default: 'CASH'
    },
    discountTotal: {
        type: Number,
        default: 0.0
    },
    username: {
        type: String,
        required: true,
    },
    store: {
        type: mongoose.Schema.ObjectId,
        ref: "Store",
        required: true
    },
    create: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);