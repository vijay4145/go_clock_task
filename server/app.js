const express = require('express');
const app = express();
const userRoute = require('./src/routes/UserRoute');
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

module.exports = app;