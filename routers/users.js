const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Users = require('../models');

//user API
router.post('/login', jsonParser, (req, res) => {
  return res.json('response from auth POST endpoint');
});

router.post('/signup', jsonParser, (req, res) => {
  return res.json(req.body);
});

module.exports = router;
