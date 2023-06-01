var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Dooby';

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) res.status(401).send({error: "not a valid token"});
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.userid = data;
        next();
    }catch(error){
        res.status(401).send({
            error: "Invalid token"
        });
    }
}


module.exports = fetchuser;