const router = require('../../node_modules/express').Router();
let {Hotel, Review} = require('../models/hotel.model');
const {verify, adminVerify} = require('./verifyToken');
let {Customer, Booking} = require('../models/customer.model');


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

router.route('/add').post(adminVerify, (req, res) =>{
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
        .then(() => res.json('Thêm khách sạn thành công'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get review list of a hotel
router.route('/review').post((req, res) => {
    const hotelId = req.body.hotelId;
    Hotel.findById(hotelId)
    .then(async hotel => {
        const customerNameArr = []
        for(i in hotel.review){
            let customerName = await Customer.findById(hotel.review[i].customerID);
            // customerNameArr.push(customerName.name);
            hotel.review[i].customerID = customerName.name;
        }
        // console.log(customerNameArr);
        res.json(hotel.review);
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
            }
        }
    }
    customer.save();
}

async function addReviewCheck(hotel, customerId, res){
    const customerExist = await Customer.findOne({ _id: customerId });
    if(!customerExist){
        res.json("Tài khoản không tồn tại");
        return false;
    }
    bookingUpdate(customerExist);

    for(i in hotel.review){
        if(hotel.review[i].customerID == customerId){
            res.json("Đã đánh giá khách sạn này trước đó, chỉ có thể chỉnh sửa.");
            return false;
        }
    }

    for(i in customerExist.booking){
        if(customerExist.booking[i].hotelId == hotel._id && customerExist.booking[i].status == "Stayed") return true;
    }

    res.json("Chỉ có thể đánh giá khách sạn đã ở");
    return false;
}

//Add a review to hotel
router.route('/review/add').post(verify, (req, res) =>{
    const hotelId = req.body.hotelId;
    
    Hotel.findById(hotelId)
    .then(async hotel => {

        const customerId = req.body.customerId;
        const content = req.body.content;
        const score = req.body.score;

        const allowAdd = await addReviewCheck(hotel, customerId, res);

        if(allowAdd){
            const newReview = new Review({
                "customerID": customerId,
                "content": content,
                "score": score
            });
    
            hotel.review.push(newReview);
    
            hotel.save()
            .then(() => res.json('Thêm đánh giá thành công'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Edit review to hotel
router.route('/review/edit').post(verify, (req, res) =>{
    const hotelId = req.body.hotelId;
    const reviewId = req.body.reviewId;
    
    Hotel.findById(hotelId)
    .then(hotel => {

        if(!hotel){
            res.json("Chỉnh sửa không thành công");
        }
        else{
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
            .then(() => res.json('Chỉnh sửa thành công'))
            .catch(err => res.status(400).json('Error: ' + err));
        }        
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Search for hotels by location
// location = [TPHCM, HN, ĐN, PT, VT, ĐL, PQ]
router.route('/location').post(async (req, res) => {
    location = req.body.location;

    let query = Hotel.find({address: {$regex: location}});
    const result = await query.exec();

    if(result) res.send(result);
    else res.json("Không tìm được địa điểm này");
});

module.exports = router;