const OrderDb = require('../models/Order');
const UserDb = require('../models/User');

module.exports = {
    post : (req, res)=>{
        UserDb.findById(req.body.userid).then(userDetail=>{
            req.body.manufacturer_id = userDetail._id;
            req.body.manufacturer_userId = userDetail.userId;
            var order = new OrderDb(req.body);
            order.save().then(item=>{
                res.status(200).json(item);
            }).catch(err=>{
                console.log(err);
                res.status(400).json({
                    error: 'bad request',
                })
            })

        })
    },

    get : (req, res)=>{
        // getOrderList  for manucfacturers
        const pipeline = [
            {
                $match : {
                    manufacturer_id: req.body.userid,
                }
            }
        ]
        OrderDb.aggregate(pipeline).then(items=>{
            res.status(200).json(items);
        }).catch(err=>{
            console.log(err);
            res.status(400).json({
                error: 'Bad request'
            })
        })
    },

    getOrderForTransporter : (req, res)=>{
        const pipeline = [
            {
                $match : {
                    'transporter._id': req.body.userid,
                }
            }
        ]
        OrderDb.aggregate(pipeline).then(items=>{
            res.status(200).json(items);
        }).catch(err=>{
            console.log(err);
            res.status(400).json({
                error: 'Bad request'
            })
        })
    }
}