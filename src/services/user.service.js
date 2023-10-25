/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const db = require('../models');
const logger = require('../config/logger');
const ApiError = require('../helpers/ApiError');

// Import Model
const { user } = db;

const checkUserAndPassword = (userData) => {
  return user.findOne({
    where: userData,
  });
};
module.exports = {
  checkUserAndPassword,
};
