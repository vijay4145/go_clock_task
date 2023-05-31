const JWT_SECRET = 'Dooby';
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const UserDb = require('../models/User');

module.exports = {
    post : (req, res)=>{
        const salt = bcrypt.genSaltSync(10);
        const secured_password = bcrypt.hashSync(req.body.password, salt);
        req.body.password = secured_password;

        var user = new UserDb(req.body);
        user.save().then(item=>{
            var token = jwt.sign(String(item._id), JWT_SECRET);
            res.status(200).json(token);
            console.log(item);
        }).catch(err=>{
            console.log(err);
            res.status(400).json({
                success: false
            })
        })
    }
}