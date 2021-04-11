const router = require('../../node_modules/express').Router();
const verify = require('./verifyToken');
let {Customer, Booking} = require('../models/customer.model');
let Hotel = require('../models/hotel.model');


//Query all customers in DB
router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error ' + err));
});

// Get a customer by customerId | token require
router.route("/").post(verify, (req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json('Error ' + err));
});

//Add 1 customer to DB
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

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
        .then(() => res.json('Customer added!'))
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
        .then(() => res.json('Favorite hotel added'))
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
        .then(() => res.json('Favorite hotel removed'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get booking list of 1 customer | token require
router.route('/booking').post(verify, (req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(customer => {
        res.json(customer.booking);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add booking of 1 customer | token require
router.route('/booking/add').post(verify, (req, res) =>{
    const customerId = req.body.customerId;
    
    Customer.findById(customerId)
    .then(customer => {

        const hotelId = req.body.hotelId;
        const checkIn = Date.parse(req.body.checkIn);
        const checkOut = Date.parse(req.body.checkOut);
        const roomType = req.body.roomType;

        const newBooking = new Booking({
            hotelId,
            checkIn,
            checkOut,
            roomType
        });

        customer.booking.push(newBooking);

        customer.save()
        .then(() => res.json('Booking hotel added'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
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
            }
        }

        customer.save()
        .then(() => res.json('Cancelled booking'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;