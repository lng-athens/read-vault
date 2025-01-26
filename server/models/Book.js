const { model, Schema } = require('mongoose');

const bookSchema = new Schema({});

module.exports = model('Book', bookSchema);