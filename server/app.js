const express = require('express');
const app = express();
const userRoute = require('./src/routes/UserRoute');
const orderRoute = require('./src/routes/OrderRoute');
require('./src/service/Dbconnection');

app.use(express.json());
const cors = require('cors');
const corsOptions ={
    origin:process.env.ALLOW_ACCESS_TO_URL, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/auth', userRoute);
app.use('/order', orderRoute);

module.exports = app;