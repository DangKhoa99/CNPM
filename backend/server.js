// const express = require('express');
const express = require('../node_modules/express');
const cors = require('../node_modules/cors');
const mongoose = require('../node_modules/mongoose');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const hotelRouter = require('./routes/hotel');
const customerRouter = require('./routes/customer');
const userAuth = require('./routes/userAuth');

app.use('/hotel', hotelRouter);
app.use('/customer', customerRouter);
app.use('/auth', userAuth)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
