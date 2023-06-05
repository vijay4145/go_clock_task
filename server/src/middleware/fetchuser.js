var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Dooby';
const userDb = require('../models/User');

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) res.status(401).send({error: "not a valid token"});
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.body.userid = data;
        userDb.findById(data).then(result=>{
            if(result) next();
            else res.status(401).json({
                error: "Invalid token"
            })
        })
    }catch(error){
        res.status(401).send({
            error: "Invalid token"
        });
    }
}


module.exports = fetchuser;