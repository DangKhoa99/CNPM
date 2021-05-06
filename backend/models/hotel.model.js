const mongoose = require('../../node_modules/mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomType: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    }
});

const reviewSchema = new Schema({
    customerID: {
        type: String,
        required: true
    },
    customerName: { //Khoa - có gì xem lại
        type: String,
    },
    content: {
        type: String
    },
    score: {
        type: Number,
        required: true
    }
})

const hotelSchema = new Schema({
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
    address: {
        type: String,
    },
    bio: {
        type: String
    },
    tien_ich: {
        type: [String]
    },
    room: {
        type: roomSchema,
        required: true
    },
    review: {
        type: [reviewSchema]
    },
    imageLink: {
        type: [String]
    }
}, {
    timestamps: true,
});

const Hotel = mongoose.model('Hotel', hotelSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = {Hotel, Review};