'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cardSchema = mongoose.Schema({
  username: { type: String, required: true },
  image: {
    full: String,
    thumb: String,
    alt: String,
    credit: String,
    portfolio: String
  },
  message: String,
  recipients: [String]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = { Card };
