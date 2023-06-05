const mongoose = require('mongoose');


const OrderSchema  = new mongoose.Schema({
    manufacturer_id: {
        type: String,
        required: true,
    },
    manufacturer_userId : {
        type: String,
        required: true,
    },
    order_id: {
        type: String,
        required: true,
        unique : true
    },
    to: {
        type: String,
        required: true,
    },
    from : {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    address : {
        type: String,
        required : true
    },
    transporter : {
        type: Object,
        required: true       
    }
});

module.exports = mongoose.model('order', OrderSchema);