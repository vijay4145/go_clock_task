const mongoose = require('mongoose');


const MessageSchema  = new mongoose.Schema({
    from : {
        type: String,
        required: true,
    },
    to : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('message', MessageSchema);