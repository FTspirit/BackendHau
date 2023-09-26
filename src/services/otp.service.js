/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const otpGenerator = require('otp-generator');
const db = require('../models');
const logger = require('../config/logger');
const ApiError = require('../helpers/ApiError');

// Import Model
const { otp } = db;

/**
 * Create Otp
 * @param {object} otpData
 * @returns {Promise<otp>}
 */
const createOtp = (otpData) => {
  return otp.create(otpData);
};

/**
 * Find one Otp
 * @param {object} otpData
 * @returns {Promise<otp>}
 */
const findOneOtp = (otpData) => {
  return otp.findOne({ where: otpData });
};

/**
 * Find one Otp by Id
 * @param {object} data
 * @returns {Promise<otp>}
 */
const findOneOtpById = (data) => {
  return otp.findOne({
    where: {
      id: data,
    },
  });
};

/**
 * Save zns data to otp
 * @param {object} znsData
 * @returns {Promise<otp>}
 */
const createZNSData = (znsData) => {
  return otp.create(znsData);
};

/**
 * Update zns data to otp
 * @param {object} znsData
 * @returns {Promise<otp>}
 */
const updateZNSData = (znsData) => {
  return otp.update(
    { msg_id: znsData.msg_id, delivery_time: znsData.delivery_time },
    {
      where: {
        id: znsData.id,
      },
    }
  );
};

/**
 * Check opt in time expire
 * @param {object} data
 * @returns {Promise<otp>}
 */
const checkOtp = (data) => {
  return otp.findOne({
    where: {
      id: data,
    },
  });
};

const generateCode = async (data) => {
  try {
    const otpCode = await findOneOtp(data);
    if (otpCode) {
      return otpCode.code;
    }
    return otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  } catch (error) {
    logger.error(`Can not generate otp code, Err: ${error}`);
    throw new ApiError(500, 'Can not generate otp code!');
  }
};

module.exports = {
  createOtp,
  findOneOtp,
  createZNSData,
  updateZNSData,
  findOneOtpById,
  generateCode,
};
