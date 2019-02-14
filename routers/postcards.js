const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Card = require('../models');

//GET cards
router.get('/', (req, res) => {
  // let username = getUsernameFromJwt(req);
  // User.findOne({ username: username }).then(user => {
  res.json('cool');
  Card.findOne();
  // .then(card => {
  //   res.json(card);
  // })
  // .catch(err => {
  //   res.status(500).json({ message: 'Internal server error' });
  // });
});
// });

module.exports = router;
