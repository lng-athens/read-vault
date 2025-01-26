const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { connectDB } = require('../configs/database');

const UserSignUp = expressAsyncHandler(async (req, res) => {});

module.exports = {
    UserSignUp
};