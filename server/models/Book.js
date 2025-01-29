const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: [
            {
                name: {
                    type: String,
                    required: [true, 'Author name is required']
                },
                role: {
                    type: String,
                    enum: ['author', 'editor'],
                    requird: [true, 'Author type is required']
                }
            }
        ],
        required: true,
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'At least one (1) author is required'
        }
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true
    },
    edition: {
        type: String
    },
    publisher: {
        type: String
    },
    published_month: {
        type: String,
        enum: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    },
    published_day: {
        type: Number,
        min: [1, 'Day must be between 1 and 31'],
        max: [31, 'Day must be between 1 and 31']
    },
    published_year: {
        type: Number,
        min: [1000, 'Year must be a valid 4-digit year'],
        max: [9999, 'Year must be a valid 4-digit year']
    },
    issue: {
        type: Number
    },
    fileSource: {
        type: String,
        required: ['Link to file is required']
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

module.exports = model('Book', bookSchema);