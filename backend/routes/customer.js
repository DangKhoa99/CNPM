const router = require('../../node_modules/express').Router();
const {verify, adminVerify} = require('./verifyToken');
let {Customer, Booking} = require('../models/customer.model');
const bcrypt = require('../../node_modules/bcrypt');
let {Hotel, Review} = require('../models/hotel.model');


//Query all customers in DB | admin required
router.route('/').get(adminVerify, (req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error ' + err));
});

// Get a customer by customerId | token require
router.route("/").post(verify, (req, res) => {
    const customerId = req.body.customerId;

    // An user can not access other user profile
    if(req.user._id != customerId) res.json('Không tìm thấy trang này');
    else {
        Customer.findById(customerId)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error ' + err));    
    }
});

//Add 1 customer to DB | admin required
router.route('/add').post(adminVerify,async (req, res) => {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const sex = req.body.sex;
    const address = req.body.address;
    const bio = req.body.bio;
    
    const booking = req.body.booking;
    const favorite = req.body.favorite;

    const newCustomer = new Customer({
        username,
        password,
        name,
        email,
        phone,
        sex,
        address,
        bio,
        booking,
        favorite
    });

    newCustomer.save()
        .then(() => res.json('Thêm khách hàng thành công'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get favorite list of 1 customer | token require
router.route('/favorite').post(verify, (req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(customer => {
        res.json(res.json(customer.favorite));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add favorite hotel | token require
router.route('/favorite/add').post(verify, (req, res) =>{
    const hotelId = req.body.hotelId;
    const customerId = req.body.customerId;
    
    Customer.findById(customerId)
    .then(customer => {

        customer.favorite.push(hotelId);

        customer.save()
        .then(() => res.json('Thêm thành công khách sạn yêu thích'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Remove favorite hotel | token require
router.route('/favorite/delete').post(verify, (req, res) =>{
    const hotelId = req.body.hotelId;
    const customerId = req.body.customerId;
    
    Customer.findById(customerId)
    .then(customer => {
        if(customer.favorite.includes(hotelId))
            customer.favorite.remove(hotelId);

        customer.save()
        .then(() => res.json('Bỏ khách sạn yêu thích thành công'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Logical for updating booking status
function bookingUpdate(customer){
    for(i in customer.booking){
        if(customer.booking[i].status != "Cancel"){                
            const curDate = new Date();
            const checkInDate = new Date(customer.booking[i].checkIn);
            const checkOutDate = new Date(customer.booking[i].checkOut);
            if(curDate < checkInDate){
                customer.booking[i].status = "Pending";
            }
            else if (curDate >= checkInDate && curDate <= checkOutDate){
                customer.booking[i].status = "Staying";
            }
            else if (curDate > checkOutDate){
                customer.booking[i].status = "Stayed";
                roomQuantityUpdate(customer.booking[i]["hotelId"], 1);
            }
        }
    }
    customer.save();
}

//Get booking list of 1 customer | token require
router.route('/booking').post(verify, (req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(customer => {

        bookingUpdate(customer);
        res.json(customer.booking);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

async function roomQuantityUpdate(hotelId, flag){
    await Hotel.findById(hotelId)
    .then(hotel => {
        hotel.room.quantity += flag
        hotel.save();
    })
    .catch(err => res.status(400).json('Error: ' + err));
} 

//Add booking of 1 customer | token require
router.route('/booking/add').post(verify, async (req, res) =>{
    const customerId = req.body.customerId;
    const hotelId = req.body.hotelId;
    let isHotelAvaiable = true;
    
    await Hotel.findById(hotelId)
    .then(hotel => {
        if(hotel.room.quantity == 0){
            isHotelAvaiable = false;
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
    if(isHotelAvaiable){
        Customer.findById(customerId)
        .then(customer => {
            const checkIn = req.body.checkIn;
            const checkOut = req.body.checkOut;
            const roomType = req.body.roomType;

            const newBooking = new Booking({
                hotelId,
                checkIn,
                checkOut,
                roomType
            });

            customer.booking.push(newBooking);
            roomQuantityUpdate(hotelId, -1);

            customer.save()
            .then(() => res.json('Đặt phòng thành công'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.json("Khách sạn này không còn phòng trống");
    }
});

//Cancel a booking of 1 customer | token require
router.route('/booking/cancel').post(verify, (req, res) =>{
    const bookingId = req.body.bookingId;
    const customerId = req.body.customerId;
    
    Customer.findById(customerId)
    .then(customer => {
        
        for(i in customer.booking){
            if(customer.booking[i]["_id"] == bookingId){
                customer.booking[i]["status"] = "Cancel";
                const hotelId = customer.booking[i]["hotelId"];
                roomQuantityUpdate(hotelId, 1);
            }
        }

        customer.save()
        .then(() => res.json('Đã hủy đơn đặt phòng'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;