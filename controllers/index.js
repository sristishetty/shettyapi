var User = require('./../models/User');
var { sendMail } = require('./../utils/index');

module.exports = {
    register: function(req, res, next){
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
              from: process.env.SMTP_FROM_MAIL,
              to: data.email,
              subject: 'Account Verification Mail',
              text: 'Here is your link'
            },function(err,data){
              if(err) return next(err);
              console.log("Mail Delivery Receipt----->",data);
            });
          });
        });
    }
};