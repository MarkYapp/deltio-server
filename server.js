const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');

//CORS
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/*', (req, res) => {
  res.json({ ok: true });
});

const router = require('./router');
app.use('/cards', router);

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// module.exports = { app };

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
