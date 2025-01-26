const { model, Schema } = require('mongoose');

const userkeySchema = new Schema({});

module.exports = model('UserKey', userkeySchema);