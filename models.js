'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const cardSchema = mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);
const Card = mongoose.model('Card', cardSchema);

module.exports = { User, Card };
