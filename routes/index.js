var express = require('express');
var router = express.Router();
var { 
  register: registerController,
  accountVerification: accountVerificationController
} = require('./../controllers/index');
var { validateRequest } = require('./../utils/index');
var { register } = require('./../validation_rules');

/* POST login */
router.post('/login', function(req, res, next) {
});

/**
 * @api {post} /register Request User Registration
 * @apiName Registration
 * @apiGroup Index
 *
 * @apiParam {String} userName Name of the user
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password of the user
 *
 * @apiSuccess {String} message User Registered Successfully
 * @apiSuccess {String} data 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User Registered Successfully",
 *       "data": ""
 *     }
 *
 * @apiError ValidationError Please Enter The Data in Specified Format.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Validation Error Message"
 *     }
 */
router.post(
  '/register',
  validateRequest(register),
  registerController
);

/**
 * @api {get} /account/verification/:code Request Account Verification
 * @apiName Account Verification
 * @apiGroup Index
 *
 * @apiSuccess {String} message Account Verified Successfully
 * @apiSuccess {String} data 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Account Verified Successfully",
 *       "data": ""
 *     }
 *
 * @apiError LinkExpired The Verification Link is invalid or expired.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Link Expired or Invalid"
 *     }
 */
router.get(
  '/account/verification/:code',
  accountVerificationController
);

module.exports = router;