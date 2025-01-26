const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    pen_name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    updatedAt: {
        type: Date,
        default: new Date().toISOString()
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = model('User', userSchema);