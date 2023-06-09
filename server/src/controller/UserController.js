const JWT_SECRET = "Dooby";
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const UserDb = require("../models/User");
const OrderDb = require('../models/Order');

module.exports = {
  post: async (req, res) => {
    if(req.body.isManufacturer === 'true'){
      if(!req.body.hasOwnProperty('address'))
        res.status(400).json({
          error: 'missing address',
        })
    }
    const salt = bcrypt.genSaltSync(10);
    const secured_password = bcrypt.hashSync(req.body.password, salt);
    req.body.password = secured_password;

    await UserDb.findOne({ userId: req.body.userId }).then((user) => {
      if (user)
        return res.status(409).json({
          error: "UserId already present",
        });
      else {
        var user = new UserDb(req.body);
        user
          .save()
          .then((item) => {
            var token = jwt.sign(String(item._id), JWT_SECRET);
            res.status(200).json({token: token});
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              error: "Bad request",
            });
          });
      }
    });
  },

  login: async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const secured_password = bcrypt.hashSync(req.body.password, salt);

    const result = UserDb.findOne({
      userId: req.body.userId,
    })
      .then((user) => {
        if (!user)
          res.status(404).json({
            error: "User not found",
          });
        else {
          const comparePassword = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (comparePassword) {
            const token = jwt.sign(String(user._id), JWT_SECRET);
            res.status(200).json({
              success: true,
              token,
            });
          } else {
            res.status(401).json({
                error: "Invalid password",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: "Bad request",
        });
      });
  },

  getUserData : (req, res)=>{
    const pipeline = [
      {
          _id: req.body.userid
      },
      {
          _id: 1,
          name: 1,
          userId: 1,
          address : 1,
          isManufacturer : 1
      }
    ]

    const pipeline2 = [
      {
        $match : {
          isManufacturer: false
        }
      },
      {
        $project : {
          _id: 1,
          userId : 1,
        }
      }
    ]
    UserDb.findOne(...pipeline).then(item=>{
      UserDb.aggregate(pipeline2).then(transporters=>{
        OrderDb.countDocuments().then(count=>{
          let response = {...item._doc, transporters, count}
          res.status(200).json(response)
        }).catch(err=>{
          console.log(err);
          res.status(400).json({
            error: 'Bad request',
          })   
        })
      }).catch(err=>{
        console.log(err);
        res.status(400).json({
          error: 'Bad request',
        })
      })
    }).catch(err=>{
      console.log(err);
      res.status(400).json({
        error: 'Bad request'
      })
    })
  }
};
