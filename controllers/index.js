var randomstring = require("randomstring");
var jwt = require('jsonwebtoken');
var User = require('./../models/User');
var { sendMail } = require('./../utils/index');

module.exports = {
  register: function (req, res, next) {
    var { userName, email } = req.body;
    User.findOne({
      $or: [
        { userName }, { email }
      ]
    }, function (err, user) {
      if (err) return next(err);

      if (user) {
        return res.status(200).json({
          message: "User Name or Email Already Taken",
          data: ""
        });
      }

      var verificationCode = randomstring.generate({
        length: 30,
        charset: 'alphanumeric'
      });

      req.body.verificationCode = verificationCode;

      User.create(req.body, (err, data) => {
        if (err) return next(err);
        res.status(200).json({
          message: "User Registered Successfully",
          data: ""
        });

        sendMail({
          from: process.env.SMTP_FROM_MAIL,
          to: data.email,
          subject: 'Account Verification Mail',
          text: `Here is your link 
            http://localhost:${process.env.PORT}/account/verification/${verificationCode}
          `
        }, function (err, data) {
          if (err) return next(err);
          console.log("Mail Delivery Receipt----->", data);
        });
      });
    });
  },
  accountVerification: function (req, res, next) {

    User.updateOne({
      verificationCode: req.params.code
    }, {
        $set: {
          isVerified: true
        },
        $unset: {
          verificationCode: ''
        }
      }, function (err, result) {
        if (err) return next(err);


        if (!user) {
          return res.status(422).json({
            message: "Link Expired or Invalid",
            data: ""
          });
        }

        res.status(200).json({
          "message": "Account Verified Successfully",
          "data": ""
        });
      });
  },
  login: function (req, res, next) {
    var { email, password } = req.body;
    User.findOne({
      email,
      isVerified: true
    }, function (err, user) {
      if (err) return next(err);

      if (!user) {
        return res.status(200).json({
          message: "User Not Found",
          data: ""
        });
      }

      user.comparePassword(password, function (err, isMatch) {
        if (err) return next(err);

        if (isMatch) {
          return res.status(200).json({
            message: "User Login Successfully",
            data: {
              userName: user.userName,
              email: user.email,
              token: jwt.sign({
                id: user._id
              }, process.env.JWT_SECRET)
            }
          });
        }

        return res.status(200).json({
          message: "Email or Password Incorrect",
          data: ""
        });
      });
    });
  }
};