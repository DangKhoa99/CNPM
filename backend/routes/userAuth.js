
const bcrypt = require('../../node_modules/bcrypt');
const router = require('../../node_modules/express').Router();
let {Customer, Booking} = require('../models/customer.model');
const jwt = require('../../node_modules/jsonwebtoken');
const Token = require('../models/token.model');

router.route('/register').post( async (req, res) => {

    //Check if a customer is already in database
    const usernameExist = await Customer.findOne({ username: req.body.username });
    if(usernameExist) return res.json('Tên tài khoản đã tồn tại');
    
    //Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //Create new customer
    const newCustomer = new Customer({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        sex: req.body.sex,
        address: req.body.address,
        bio: req.body.bio,
        booking: req.body.booking,
        favorite: req.body.favorite
    });

    try{
        newCustomer.save();
        res.json('Tạo tài khoản thành công');
    } catch(err) {
        res.status(400).send(err);
    }    
});

router.route('/login').post( async (req, res) => {
    //Check if username is in database
    const user = await Customer.findOne({ username: req.body.username });
    if(!user) return res.json('Tài khoản hoặc mật khẩu không đúng');
   
    //Check if passwrod is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.json("Tài khoản hoặc mật khẩu không đúng");

    //Create and assign a token
    const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.TOKEN_SECRET);
    
    //Save token to database
    const newToken = new Token({
        userId: user._id,
        tokenString: token
    });

    newToken.save()
    .then(() => res.header('auth-token', token).json({"authToken" : token, "customerId": user._id, "isAdmin": user.isAdmin}))
    .catch(err => res.status(400).json('Error: ' + err)) 
});

router.route('/logout').post(async (req, res) => {
    const token = req.header('auth-token');
    const tokenCheck = await Token.findOne({ tokenString: token });
    if(tokenCheck){
        Token.findOneAndDelete({tokenString: token})
        .then(() => res.json("Đăng xuất thành công"))
        .catch(err => res.status(400).json('Error: ' + err));
    } else{
        res.json('Đăng xuất thất bại');
    }
})

module.exports = router;