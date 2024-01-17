/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const db = require('../models');
const logger = require('../config/logger');
const ApiError = require('../helpers/ApiError');
const { login } = require('../controllers/user.controller');

// Import Model
const { User, Order } = db;

/**
 * Register user
 * @param {object} userData
 * @returns {Promise<user>}
 */
const registerService = (userData) => {
  return User.create({
    phone_number: userData.phone_number ? userData.phone_number : 12345678910,
    password: userData.password ? userData.password : 1,
    full_name: userData.phone_number ? userData.full_name : '',
    address: userData.phone_number ? userData.address : '',
    email: userData.phone_number ? userData.email : '',
    role_id: 1,
  });
};

/**
 * Login
 * @param {object} userData
 * @returns {Promise<user>}
 */
const checkLoginService = (loginData) => {
  return User.findOne({
    where: {
      phone_number: loginData.phone_number,
      password: loginData.password,
    },
  });
};

/**
 * Get user by id
 * @param {integer} userId
 * @returns {Promise<user>}
 */
const getUserById = (userId) => {
  return User.findOne({
    where: {
      id: userId,
    },
  });
};

/**
 * Delete user by id
 * @param {integer} userId
 * @returns {Promise<user>}
 */
const deleteUserById = (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
    include: [
      {
        model: Order,
        as: 'order', // Alias to access the associated orders
      },
    ],
  });
};

module.exports = {
  registerService,
  checkLoginService,
  getUserById,
  deleteUserById,
};
