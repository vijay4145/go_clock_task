const MessageDb = require('../models/Message');

module.exports = {
    addMessage : (req, res)=>{
        req.body.from = req.body.userid;
        var mesg = new MessageDb(req.body);
        mesg.save().then(item=>{
            res.status(200).json(item);
        }).catch(err=>{
            console.log(err);
            res.status(400).json({
                error: 'bad request'
            })
        })
    },

    getMessages : (req, res)=>{
        var pipeline = [
            {
                $sort: {
                  dateField: 1 // 1 for ascending order, -1 for descending order
                }
            },
            {
                $match : {
                    $or:[
                        {to : req.params.to},
                        {from : req.params.to},                 
                        {to : req.body.userid},
                        {from :req.body.userid},                 
                    ], 
                }
            }
        ]

        MessageDb.aggregate(pipeline).then(items=>{
            res.status(200).json(items)
        }).catch(err=>{
            console.log(err);
            res.status(400).json({
                error: 'bad request'
            })
        })

    }
}