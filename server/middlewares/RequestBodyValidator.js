const validator = require('validator');

const isUsername = (value) => {
    const regex = /^[A-Za-z0-9][A-Za-z0-9_.]*$/;

    return regex.test(value);
}

const isName = (value) => {
    const regex = /^[A-Za-z]+([ ]?[A-Za-z]+)*$/;

    return regex.test(value);
}

const isValidMonth = (value) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return months.includes(value);
};

const isValidDay = (day, month, year) => {
    if (!validator.isInt(day.toString(), { min: 1, max: 31 })) return false;
    const daysInMonth = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0).getDate();
    
    return day <= daysInMonth;
};

const isValidYear = (year) => {
    return validator.isInt(year.toString(), { min: 1000, max: 9999 });
};

const ValidateBookRequestBody = (req, res, next) => {
    const {
        title,
        author,
        isbn,
        edition,
        publisher,
        published_month,
        published_day,
        published_year,
        issue,
        fileSource
    } = req.body;

    let errorFields = [];

    if (title && !isValidText(title)) {errorFields.push('title')}
    if (author && !author.every(validator.isAlpha)) {errorFields.push('author')}
    if (isbn && !validator.isISBN(isbn)) {errorFields.push('isbn')}
    if (edition && !validator.isAlphanumeric(edition)) {errorFields.push('edition')}
    if (publisher && !validator.isAlpha(publisher)) {errorFields.push('publisher')}
    if (published_month && !isValidMonth(published_month)) {errorFields.push('published_month')}
    if (published_day && (!published_year || !published_month || !isValidDay(published_day, published_month, published_year))) {errorFields.push('published_day')}
    if (published_year && !isValidYear(published_year)) {errorFields.push('published_year')}
    if (issue && !validator.isNumeric(issue)) {errorFields.push('issue')}
    if (fileSource && !validator.isURL(fileSource)) {errorFields.push('fileSource')}

    if (errorFields.length > 0) {
        res.status(400);
        throw new Error(`Invalid fields: ${errorFields.join(', ')}`);
    }

    next();
};

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