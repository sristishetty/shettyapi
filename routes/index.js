var express = require('express');
var router = express.Router();
var { 
  register: registerController
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

module.exports = router;