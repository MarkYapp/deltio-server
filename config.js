'use strict';

exports.DATABASE_URL =
  process.env.MONGODB_URI || global.MONGODB_URI || 'mongodb://localhost/deltio-data';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/deltio-data-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
