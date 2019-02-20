// 'user strict'
const { app, runServer, closeServer } = require('../server');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const { User } = require('../users');

describe('User login', function() {
  const name = 'testname';
  const username = 'testusername';
  const password = 'testpassword';

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        name,
        username,
        password
      })
    );
  });

  afterEach(function() {
    return User.remove({});
  });

  describe('/api/login', function() {
    it('should return a valid auth token', function() {
      return chai
        .request(app)
        .post('/api/login')
        .send({ username, password })
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.authToken).to.be.a('string');
          const payload = jwt.verify(res.body.authToken, JWT_SECRET, {
            algorith: ['HS256']
          });
          expect(payload.user).to.contain({ name, username });
        });
    });
  });
});
