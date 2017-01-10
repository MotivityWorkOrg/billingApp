let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    storeLocation: {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
        required: 'store address is required'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Store", storeSchema);