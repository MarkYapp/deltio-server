'user strict';
const { app, runServer, closeServer } = require('../server');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const { Card } = require('../postcard');
const { User } = require('../users');
const { cards } = require('../card-seed-data');

const testCard = {
  username: 'testuser',
  image: {
    full:
      'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjU0MzUwfQ',
    thumb:
      'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjU0MzUwfQ',
    alt: 'four assorted-color tabby kittens on brown basket',
    credit: 'Jari Hytönen',
    portfolio: 'https://unsplash.com/@jarispics'
  },
  message:
    'Eiusmod ut do labore nostrud deserunt consequat ut exercitation aliqua reprehenderit proident officia eiusmod.Ex ullamco incididunt eu in sit consequat nulla excepteur fugiat elit ipsum. Culpa sint sunt est esse est laborum velit anim voluptate magna do id veniam Lorem. Ut irure labore laboris est. Non eu eiusmod eu in. Quis aute labore veniam eu occaecat Lorem eu culpa aliquip elit Lorem magna do.',
  recipients: "['example1@gmail.com', 'example2@yahoo.com', 'example3@aol.com']"
};

function seedCardData() {
  console.info('Seeding postcard data');
  return Card.insertMany(cards);
}

function tearDownDb() {
  console.info('Deleting database');
  return mongoose.connection.dropDatabase();
}

//start of test
describe('Card endpoints', function() {
  let testuser = { name: 'testuser', username: 'testuser', password: 'password' };

  before(function() {
    console.info('Starting database');
    return runServer(TEST_DATABASE_URL);
  });

  before(function() {
    return User.hashPassword(testuser.password).then(password =>
      User.create({
        name: testuser.name,
        username: testuser.username,
        password
      }).then(user => {
        authToken = jwt.sign({ user }, JWT_SECRET);
      })
    );
  });

  beforeEach(function() {
    return seedCardData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {
    it('should get all cards', function() {
      return chai
        .request(app)
        .get('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          expect(res.body[0]).to.include.keys('image', 'message', 'recipients');
        });
    });

    it('should GET one card', function() {
      return Card.findOne().then(card => {
        return chai
          .request(app)
          .get(`/api/cards/${card._id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('image', 'message', 'recipients', '_id');
            expect(res.body._id).to.equal(card._id.toString());
          });
      });
    });
  });

  describe('POST endpoint', function() {
    it('should save a new card to database', function() {
      return chai
        .request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testCard)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('image', 'message', 'recipients');
        });
    });
  });

  describe('PUT endpoint', function() {
    const fieldsToUpdate = {
      message: 'hello world',
      recipients: ['hello@world.com']
    };

    it('should update a card', function() {
      Card.findOne().then(card => {
        fieldsToUpdate.id = card._id;
        return chai
          .request(app)
          .put(`/api/cards/${fieldsToUpdate.id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(fieldsToUpdate)
          .then(res => {
            expect(res).to.have.status(204);
            return Card.findById(fieldsToUpdate.id).then(card => {
              expect(card.message).to.equal(fieldsToUpdate.message);
              expect(card.recipients).to.equal(fieldsToUpdate.recipients);
            });
          });
      });
    });
  });

  describe('DELETE endpoint', function() {
    let card;
    it('should delete a card', function() {
      return Card.findOne()
        .then(_card => {
          card = _card;
          return chai
            .request(app)
            .delete(`/api/cards/${card._id}`)
            .set('Authorization', `Bearer ${authToken}`);
        })
        .then(res => {
          expect(res).to.have.status(204);
          return Card.findById(card._id).then(card => {
            expect(card).to.be.null;
          });
        });
    });
  });
});
