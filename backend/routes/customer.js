const router = require('express').Router();
let Customer = require('../models/customer.model');
let Hotel = require('../models/hotel.model');

// check if a customer in DB
function isCustomerInDB(customerId){
    let couter = Customer.find(new ObjectId(customerId)).count();
    if(couter == 0)
        return false
    return true
};

// check if a hotel in DB
function isHotelInDB(hotelId){
    // let counter = Hotel.findbyId(hotelId).count();
    // if(couter == 0)
    //     return false
    return true
};

//Query all customers in DB
router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
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

//Add favorite hotel
router.route('/favorite/add').post((req, res) =>{
    const hotelId = req.body.hotelId;
    const customerId = req.body.customerId;
    if(isHotelInDB(hotelId)){
        if(isCustomerInDB(customerId)){
            let prev_favorite = Customer.findById(customerId).favorite;
            console.log(prev_favorite)
            // prev_favorite.push(hotelId);
            // Customer.findByIdAndUpdate(customerId, {favorite: prev_favorite});
            // res.json('Favorite hotel added!');
        }
        res.json('This customer is not avaiable');
    }
    res.json('This hotel is not available');
});


//Remove favorite hotel

module.exports = router;