const express = require('express');
const router = express.Router();
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwtDecode = require('jwt-decode');

// var jwt = require('jwt-simple');
// const { JWT_SECRET } = require('./config');
const jwtAuth = passport.authenticate('jwt', { session: false });

const { Card } = require('./models');
const { User } = require('../users/models');

decodeJwt = authToken => {
  const decodedToken = jwtDecode(authToken);
  // console.log(decodedToken);
  return decodedToken.user.username;
};

//Fetch all cards
router.get('/', (req, res) => {
  console.log('router.get hit');
  let username = decodeJwt(req.headers.authorization);
  console.log(username);
  Card.find({ username: username })
    .then(cards => {
      console.log(cards);
      res.json(cards);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//Fetch one card
router.get('/:id', (req, res) => {
  return res.json('response from auth POST endpoint');
});

//Create a card
router.post('/', jsonParser, (req, res) => {
  // console.log(req.body);
  const { full, thumb, alt, credit, portfolio } = req.body.image;
  const { username, recipients, message } = req.body;
  console.log(full, thumb, alt, credit, portfolio);
  Card.create({
    username,
    image: { full, thumb, alt, credit, portfolio },
    recipients,
    message
  })
    .then(card => res.status(201).json(card))
    .catch(err => {
      // console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

//Update a card
router.put('/:id', jsonParser, (req, res) => {
  console.log(req.params.id);

  const toUpdate = {};
  const updateableFields = ['image', 'recipients', 'message'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  Card.findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//Delete a card
router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  Card.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = { router };
