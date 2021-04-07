const router = require('express').Router();
let Hotel = require('../models/hotel.model');

//Query all hotels in DB
router.route('/').get((req, res) => {
    Hotel.find()
        .then(hotels => res.json(hotels))
        .catch(err => res.status(400).json('Error ' + err));
});

//Add 1 hotel to DB
router.route('/add').post((req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const bio = req.body.bio;
    const tien_ich = req.body.tien_ich;
    const imageLink = req.body.imageLink;

    const newHotel = new Hotel({
        name,
        email,
        phone,
        address,
        bio,
        tien_ich,
        room: req.body.room,
        review: req.body.review,
        imageLink
    });

    newHotel.save()
        .then(() => res.json('Hotel added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;