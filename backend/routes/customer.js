const router = require('express').Router();
let Customer = require('../models/customer.model');
let Hotel = require('../models/hotel.model');

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

//Get favorite list of 1 customer
router.route('/favorite').post((req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(customer => {
        res.json(res.json(customer.favorite));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add favorite hotel
router.route('/favorite/add').post((req, res) =>{
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

//Remove favorite hotel
router.route('/favorite/delete').post((req, res) =>{
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

module.exports = router;