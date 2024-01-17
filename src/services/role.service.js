/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const db = require('../models');
const logger = require('../config/logger');
const ApiError = require('../helpers/ApiError');

// Import Model
const { User, Role } = db;

/**
 * Create Role
 * @param {string} roleData
 * @returns {Promise<Role>}
 */
const createRoleService = (roleData) => {
  return Role.create({
    name: roleData,
  });
};

/**
 * Find role by name
 * @param {string} roleData
 * @returns {Promise<Role>}
 */
const findRoleService = (roleData) => {
  return Role.findOne({
    where: {
      name: roleData,
    },
  });
};

/**
 * Find role by id
 * @param {string} roleData
 * @returns {Promise<Role>}
 */
const findRoleByIdService = (roleData) => {
  return Role.findOne({
    where: {
      id: roleData,
    },
  });
};

/**
 * Delete role by name
 * @param {string} roleData
 * @returns {Promise<Role>}
 */
const deleteRoleService = (RoleData) => {
  return Role.destroy({
    where: {
      name: RoleData,
    },
  });
};

/**
 * Find all role
 * @param {string} roleData
 * @returns {Promise<Role>}
 */
const findAllRoleService = () => {
  return Role.findAll();
};

module.exports = {
  createRoleService,
  findRoleService,
  deleteRoleService,
  findAllRoleService,
  findRoleByIdService,
};
