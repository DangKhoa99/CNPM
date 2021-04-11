const mongoose = require('../../node_modules/mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        require: true
    },
    tokenString: {
        type: String,
        require: true
    }
})

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;