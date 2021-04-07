const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const customerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    sex: {
        type: Boolean
    },
    address: {
        type: String,
    },
    bio: {
        type: String
    },
    booking: {
        type: [bookingSchema]
    },
    favorite: {
        type: [String]
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, {
    timestamp: true,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;