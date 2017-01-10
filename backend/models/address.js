let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let addressSchema = new Schema({
    addressType:{
        type: String,
        trim: true,
        default: 'Home'
    },
    contactName: {
        type: String,
        trim: true,
        default: ''
    },
    address1: {
        type: String,
        trim: true,
        default: ''
    },
    address2: {
        type: String,
        trim: true,
        default: ''
    },
    city: {
        type: String,
        required: "Please select city"
    },
    pinCode: {
        type: Number,
        required: 'Please enter valid pin code number',
        maxLength: Number(6)
    },
    state: {
        type: String,
        trim: true,
        default: 'Telangana'
    },
    telephone: {
        type: Number,
        required: 'Please enter valid telephone number',
        maxLength: Number(10)
    },
    country: {
        type: String,
        trim: true,
        default: 'India'
    }
});

module.exports = mongoose.model("Address", addressSchema);