const router = require('../../node_modules/express').Router();
let {Hotel, Review} = require('../models/hotel.model');

//Query all hotels in DB
router.route('/').get((req, res) => {
    Hotel.find()
        .then(hotels => res.json(hotels))
        .catch(err => res.status(400).json('Error ' + err));
});

//Get a hotel by hotelId
router.route("/").post((req, res) => {
    const hotelId = req.body.hotelId;
    Hotel.findById(hotelId)
    .then(hotel => res.json(hotel))
    .catch(err => res.status(400).json('Error ' + err));
});

// router.route("/:id").get((req, res) => {
//     const hotelId = req.params.id;
//     Hotel.findById(hotelId)
//     .then(hotel => res.json(hotel))
//     .catch(err => res.status(400).json('Error ' + err));
// });

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

//Get review list of a hotel
router.route('/review').post((req, res) => {
    const hotelId = req.body.hotelId;
    Hotel.findById(hotelId)
    .then(hotel => {
        res.json(hotel.review);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add a review to hotel
router.route('/review/add').post((req, res) =>{
    const hotelId = req.body.hotelId;
    
    Hotel.findById(hotelId)
    .then(hotel => {

        const customerId = req.body.customerId;
        const content = req.body.content;
        const score = req.body.score;
        
        const newReview = new Review({
            "customerID": customerId,
            "content": content,
            "score": score
        });

        hotel.review.push(newReview);

        hotel.save()
        .then(() => res.json('Review added'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Edit review to hotel
router.route('/review/edit').post((req, res) =>{
    const hotelId = req.body.hotelId;
    const reviewId = req.body.reviewId;
    
    Hotel.findById(hotelId)
    .then(hotel => {

        const customerID = req.body.customerId;
        const content = req.body.content;
        const score = req.body.score;
        
        for(i in hotel.review){
            if(hotel.review[i]["_id"] == reviewId){
                hotel.review[i]["customerID"] = customerID;
                hotel.review[i]["content"] = content;
                hotel.review[i]["score"] = score;
            }
        }

        hotel.save()
        .then(() => res.json('Edit successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;