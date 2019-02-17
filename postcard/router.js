const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Card } = require('./models');

//Fetch all cards
router.get('/', jsonParser, (req, res) => {
  Card.find().then(card => {
    res.json(card);
  });
});

//Fetch one card
router.get('/:id', jsonParser, (req, res) => {
  return res.json('response from auth POST endpoint');
});

//Create a card
router.post('/', jsonParser, (req, res) => {
  // let username = getUsernameFromJwt(req);
  // User.findOne({ 'username': username })
  const { full, thumb, alt, credit, portfolio } = req.body.image;
  const { recipients, message } = req.body;
  Card.create({
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
  // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //   const message =
  //     `Request path id (${req.params.id}) and request body id ` + `(${req.body.id}) must match`;
  //   return res.status(400).json({ message: message });
  // }

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
