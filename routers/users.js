const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Users = require('../models');

//user API
router.post('/', jsonParser, (req, res) => {
  console.log('server user API reached');
  console.log(req.body);
  return res.json(req.body);
  // const username = JSON.stringify(req.body.username);
  // console.log(username);
  // username = JSON.stringify(req.body.username);
  // password = JSON.stringify(req.body.password);

  // res.json({ username });
});

module.exports = router;
