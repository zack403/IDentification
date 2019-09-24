const express = require('express');
const user = require('../routes/user');
const errorHandler = require('../middleware/error');

module.exports = app => {
  app.use(express.json());
  app.use('/api/v1/user', user);
  app.use(errorHandler);
}