const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { connectDB } = require('../configs/database');

const UserSignUp = expressAsyncHandler(async (req, res) => {
    const { firstName, middleName, lastName, username, pen_name, email, password } = req.body;

    const db = await connectDB();
    const userCollection = db.collection('users');
    const filter = {$or: [{username: username}, {pen_name: pen_name}, {email: email}]};

    const userExist = await userCollection.findOne(filter);
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        middleName,
        lastName,
        username,
        pen_name,
        email,
        password: hashedPassword
    });

    const addUserResult = await userCollection.insertOne(newUser);
    if (!addUserResult.acknowledged || !addUserResult.insertedId) {
        res.status(500);
        throw new Error('Failed to create user');
    }

    res.status(201).send({message: 'User created successfully'});
});

module.exports = {
    UserSignUp
};