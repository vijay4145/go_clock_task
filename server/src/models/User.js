const mongoose = require('mongoose');
// const {Schema} = mongoose;

const NotesSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isManufacturer : {
        type: Boolean,
        required: true       
    }
});

module.exports = mongoose.model('users', NotesSchema);