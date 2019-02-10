'use strict';
exports.DATABASE_URL =
  process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/deltio-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-deltio-db';
