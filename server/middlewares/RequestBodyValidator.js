const validator = require('validator');

const isUsername = (value) => {
    const regex = /^[A-Za-z0-9][A-Za-z0-9_.]*$/;

    return regex.test(value);
}

const isName = (value) => {
    const regex = /^[A-Za-z]+([ ]?[A-Za-z]+)*$/;

    return regex.test(value);
}

const ValidateBookRequestBody = (req, res, next) => {};

const ValidateUserRequestBody = (req, res, next) => {
    const {
        firstName,
        middleName,
        lastName,
        username,
        pen_name,
        email,
        password,
        userId
    } = req.body;

    let errorFields = [];

    if (firstName && !isName(firstName)) {errorFields.push('firstName')}
    if (middleName && !isName(middleName))  {errorFields.push('middleName')}
    if (lastName && !isName(lastName))  {errorFields.push('lastName')}
    if (username && !isUsername(username)) {errorFields.push('username')}
    if (pen_name && !isName(pen_name)) {errorFields.push('pen_name')}
    if (email && !validator.isEmail(email)) {errorFields.push('email')}
    if (password && !validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {errorFields.push('password')}
    if (userId && !(isUsername(userId) || validator.isEmail(userId))) {errorFields.push('userId')}

    if (errorFields.length > 0) {
        res.status(400);
        throw new Error(`Invalid fields: ${errorFields.join(', ')}`);
    }

    next();
};

module.exports = {
    ValidateBookRequestBody,
    ValidateUserRequestBody
};