const express = require('express');
const router = express.Router();
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwtDecode = require('jwt-decode');

const jwtAuth = passport.authenticate('jwt', { session: false });

const { Card } = require('./models');

decodeJwt = authToken => {
  const decodedToken = jwtDecode(authToken);
  return decodedToken.user.username;
};

//Fetch one card - does not require auth
router.get('/:id', (req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//Fetch all cards
router.get('/', jwtAuth, (req, res) => {
  let username = decodeJwt(req.headers.authorization);
  Card.find({ username: username })
    .then(cards => {
      res.json(cards);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//Create a card
router.post('/', jsonParser, jwtAuth, (req, res) => {
  const { full, thumb, alt, credit, portfolio } = req.body.image;
  const { username, recipients, message } = req.body;
  Card.create({
    username,
    image: { full, thumb, alt, credit, portfolio },
    recipients,
    message
  })
    .then(card => res.status(201).json(card))
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

//Update a card
router.put('/:id', jsonParser, jwtAuth, (req, res) => {
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
router.delete('/:id', jwtAuth, (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = { router };
