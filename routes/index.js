var express = require('express');
var router = express.Router();
var User = require('./../models/User');
var { validateRequest, sendMail } = require('./../utils/index');
var { register } = require('./../validation_rules');

/* POST login */
router.post('/login', function(req, res, next) {
});

/* POST register */
router.post(
  '/register',
  validateRequest(register),
  function(req, res, next){
    var { userName, email } = req.body;
    User.findOne({
      $or:[
        { userName }, { email }
      ]
    },function(err, user){
      if(err) return next(err);

      if(user) {
        return res.status(200).json({
          message: "User Name or Email Already Taken",
          data: ""
        });
      }

      User.create(req.body,(err, data)=>{
        if(err) return next(err);
        res.status(200).json({
          message: "User Registered Successfully",
          data: ""
        });
        sendMail({
          from: 'admin@express-API.com',
          to: data.email,
          subject: 'Account Verification Mail',
          text: 'Here is your link'
        },function(err,data){
          if(err) return next(err);
          console.log("Mail Delivery Receipt----->",data);
        });
      });
    });
});

module.exports = router;