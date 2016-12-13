let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let storeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    storeLocation: {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
        required: 'store address is required'
    },
    adminUsers: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    storeUsers: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Store", storeSchema);