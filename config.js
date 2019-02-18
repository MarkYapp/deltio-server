'use strict';
// exports.CLIENT_ORIGIN = process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:3000';
exports.CLIENT_ORIGIN = 'http://localhost:3000';

exports.DATABASE_URL =
  process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/deltio-data';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/deltio-data';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
