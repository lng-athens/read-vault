const express = require('express');
const router = express.Router();
const {} = require('../middlewares/Authentication');
const { ValidateBookRequestBody } = require('../middlewares/RequestBodyValidator');
const { AddBook } = require('../controllers/booksController');

router.route('/add').post(ValidateBookRequestBody, AddBook);

module.exports = router;