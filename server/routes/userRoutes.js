const express = require('express');
const router = express.Router();
const {} = require('../middlewares/Authentication');
const { ValidateUserRequestBody } = require('../middlewares/RequestBodyValidator');
const { UserSignUp } = require('../controllers/usersController');

router.route('/sign-up').post(ValidateUserRequestBody, UserSignUp);

module.exports = router;