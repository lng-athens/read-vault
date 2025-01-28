const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');
const UserKey = require('../models/UserKey');
const bcrypt = require('bcrypt');
const { connectDB } = require('../configs/database');
const { v7: uuidv7} = require('uuid');
const { generateToken } = require('../services/authService');

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

const UserSignIn = expressAsyncHandler(async (req, res) => {
    const { userId, password } = req.body;
    const userIp = req.ip;
    const userAgent = req.useragent;

    const db = await connectDB();
    const userCollection = db.collection('users');
    const userkeyCollection = db.collection('user_keys');
    const filter = {$or : [{username: userId}, {email: userId}]};

    const user = await userCollection.findOne(filter);
    if (!user) {
        res.status(404);
        throw new Error('User does not exists');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        res.status(401);
        throw new Error('Incorrect password');
    }

    const payload = {
        iss: "ReadVault",
        sub: user._id.toString(),
        aud: ["https://yourapi.com", "https://yourfrontend.com"],
        iat: Math.floor(Date.now() / 1000),
        jti: uuidv7(),
        user: {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            username: user.username,
            pen_name: user.pen_name,
            email: user.email
        },
        ip: userIp,
        userAgent: userAgent.source || 'unknown'
    }

    const { privateKey, publicKeyJwk, token } = await generateToken(payload);

    const userkeyFilter = {$or: [{username: userId}, {email: userId}]};
    const userkey = await userkeyCollection.findOne(userkeyFilter);
    if (userkey) {
        const updateResult = await userkeyCollection.updateOne(userkeyFilter, {$push: { privateKey }});

        if (!updateResult.acknowledged) {
            res.status(500);
            throw new Error('Failed to add user key');
        }
    }
    else {
        const newKey = new UserKey({
            username: user.username,
            email: user.email,
            privateKey
        });
    
        const addKeyResult = await userkeyCollection.insertOne(newKey);
        if (!addKeyResult.acknowledged || !addKeyResult.insertedId) {
            res.status(500);
            throw new Error('Failed to add user key');
        }
    }

    res.cookie('__Secure-token', token , {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax'
    });
    res.status(200).send({publicKey: publicKeyJwk});
});

module.exports = {
    UserSignUp,
    UserSignIn
};