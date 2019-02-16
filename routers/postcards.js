const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Card } = require('../models');

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
  return res.json('response from auth PUT endpoint');
});

//Delete a card
router.delete('/:id', jsonParser, (req, res) => {
  return res.json('response from auth DELETE endpoint');
});

module.exports = router;
