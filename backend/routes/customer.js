const router = require('../../node_modules/express').Router();
const {verify, adminVerify} = require('./verifyToken');
let {Customer, Booking} = require('../models/customer.model');
const bcrypt = require('../../node_modules/bcrypt');
let {Hotel, Review} = require('../models/hotel.model');
const { HowToRegOutlined } = require('@material-ui/icons');
let Token = require('../models/token.model');


// Get all customers in DB | admin required
router.route('/').get(adminVerify, (req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error ' + err));
});

// Get a customer by Admin | token require
router.route("/getUser").post(adminVerify, (req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(customer => res.json(customer))
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

    //Check if a customer is already in database
    const usernameExist = await Customer.findOne({ username: req.body.username });
    if(usernameExist) return res.json('Tên tài khoản đã tồn tại');

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
        favorite,
        isAdmin: req.body.isAdmin
    });

    newCustomer.save()
        .then(() => res.json('Thêm khách hàng thành công'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete 1 customer from DB | admin required
router.route('/delete').post(adminVerify, async (req, res) =>{
    const customerId = req.body.customerId;

    const deletedItem = await Customer
        .findByIdAndDelete(customerId)
        .catch(err => res.status(400).send(err.message))

    const isLogIn = await Token.findOne({userId: customerId});
    if(isLogIn){
        Token.findOneAndDelete({userId: customerId})
        .then(() => res.json("Xóa người dùng thành công"))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        res.status(200).send("Xóa người dùng thành công");
    }
});

// Edit user | token require
router.route("/edit").post(verify, (req, res) => {
    const customerId = req.body.customerId;

    Customer.findById(customerId)
    .then(customer => {
        customer.name = req.body.name;
        customer.email = req.body.email;
        customer.phone = req.body.phone;
        customer.sex = req.body.sex;
        customer.address = req.body.address;
        customer.bio = req.body.bio;

        customer.save()
        .then(() => res.json('Chỉnh sửa người dùng thành công'))
        .catch(err => res.status(400).json('Error: ' + err));   
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Edit user by admin | admin required
router.route("/editByAdmin").post(adminVerify, (req, res) => {
    const customerId = req.body.customerId;

    Customer.findById(customerId)
    .then(customer => {
        customer.isAdmin = req.body.isAdmin;

        customer.save()
        .then(() => res.json('Chỉnh sửa người dùng thành công'))
        .catch(err => res.status(400).json('Error: ' + err));   
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Change password of 1 customer | token require
router.route('/changePassword').post(verify, (req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(async customer => {
        const newPassword = await bcrypt.hash(req.body.newPassword, 10);

        const isTrueOldPass = await bcrypt.compare(req.body.oldPassword, customer.password);

        if(!isTrueOldPass)
            return res.json("Mật khẩu cũ không chính xác");

        customer.password = newPassword;
        
        customer.save()
        .then(() => res.json('Đổi mật khẩu thành công'))
        .catch(err => res.status(400).json('Error: ' + err));
        
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get favorite list of 1 customer | token require
router.route('/favorite').post(verify, (req, res) => {
    const customerId = req.body.customerId;
    Customer.findById(customerId)
    .then(async customer => {
        
        const favoriteHotelArr = await Hotel.find().where('_id').in(customer.favorite).exec();
        res.json(favoriteHotelArr);
        
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

//Get booking list of 1 customer by its status | token require
// status = [Pending, Staying, Stayed, Cancel]
router.route('/bookingByStatus').post(verify, (req, res) => {
    const customerId = req.body.customerId;
    const status = req.body.status;

    Customer.findById(customerId)
    .then(async customer => {

        bookingUpdate(customer);
        
        var books = JSON.stringify(customer.booking);
        var books = JSON.parse(books);

        var filterResult = []

        for(var i = 0; i < books.length; i++){
            // console.log(books[i]);
            if(books[i].status === status)
                filterResult.push(books[i]);
        }

        res.json(filterResult);
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

// View 1 booking of 1 customer || token require
router.route('/booking/view_one').post(verify, (req, res) =>{
    const bookingId = req.body.bookingId;
    const customerId = req.body.customerId;
    
    Customer.findById(customerId)
    .then(customer => {

        let bookingToRes = [];
        
        for(i in customer.booking){
            if(customer.booking[i]["_id"] == bookingId){
                bookingToRes = customer.booking[i];
                break;
            }
        }

        customer.save()
        .then(() => res.json(bookingToRes))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;