const jwt = require('../../node_modules/jsonwebtoken');
const Token = require('../models/token.model');

async function verify(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    const tokenCheck = await Token.findOne({ tokenString: token });
    if(!tokenCheck) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid token');
    }
}

async function adminVerify(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    const tokenCheck = await Token.findOne({ tokenString: token });
    if(!tokenCheck) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if(!req.user.isAdmin) return res.status(401).send('Access Denied');
        else next();
    } catch(err) {
        res.status(400).send('Invalid token');
    }
}

module.exports = {verify, adminVerify}