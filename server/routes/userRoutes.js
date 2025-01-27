const express = require('express');
const router = express.Router();
const {} = require('../middlewares/Authentication');
const { ValidateUserRequestBody } = require('../middlewares/RequestBodyValidator');
const { UserSignUp, UserSignIn } = require('../controllers/usersController');

router.route('/sign-up').post(ValidateUserRequestBody, UserSignUp);

router.route('/sign-in').post(ValidateUserRequestBody, UserSignIn);

module.exports = router;