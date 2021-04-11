const mongoose = require('../../node_modules/mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    hotelId: {
        type: String,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
});

// bookingSchema.pre("find", function(next){
//     if(this.status.localeCompare("Cancel") == 1){
//         var today = new Date();
//         if(today < this.check_in)
//             this.status = "Pending";
//         else if (today >= this.check_in && today <= this.check_out)
//             this.status = "Currently staying";
//         else if (today > this.check_out)
//             this.status = "Stayed";
//         next();
//     }
// });

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
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {Customer, Booking};
