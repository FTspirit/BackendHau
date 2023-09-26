const Joi = require('joi');

const sendOtp = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    otp: Joi.string().required(),
    time_expired: Joi.string().required(),
  }),
};

const sendZNS = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    customer_id: Joi.string().required(),
    time_feedback: Joi.string().required(),
  }),
};

module.exports = {
  sendOtp,
  sendZNS,
};
