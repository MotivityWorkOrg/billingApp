let mongoose = require('mongoose');

let storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    storeAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: 'store address is required'
    },
    telephone: {
        type: String,
        required: 'Please enter valid telephone number',
        maxLength: Number(10)
    },
    user: {
        type: String,
        default: null
    },
    update: {
        type: Date,
        default: null
    },
    create: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Store", storeSchema);