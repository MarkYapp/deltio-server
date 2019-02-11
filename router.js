const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//GET all entries
router.get('/', jwtAuth, (req, res) => {
  let username = getUsernameFromJwt(req);
  User.findOne({ username: username }).then(user => {
    Entry.find({ userId: user.id })
      .then(entry => {
        res.json({
          entries: entry.map(entry => entry.serialize())
        });
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal server error' });
      });
  });
});
