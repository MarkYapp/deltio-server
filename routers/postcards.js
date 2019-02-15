const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Card = require('../models');

//GET cards
router.post('/', jsonParser, (req, res) => {
  return res.json('response from auth POST endpoint');
  // res.json('cool');
  // Card.findOne();
  // .then(card => {
  //   res.json(card);
  // })
  // .catch(err => {
  //   res.status(500).json({ message: 'Internal server error' });
  // });
});
// });

module.exports = router;
