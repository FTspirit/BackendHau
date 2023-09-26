const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const Logger = require('../config/logger');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    Logger.info(info);
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  resolve(user);
};

const auth = () => async (req, res, next) =>
  new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

const authInvalid = () => async (req, res, next) =>
  new Promise((resolve, reject) => {
    passport.authenticate('jwt-invalidate', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

module.exports = { auth, authInvalid };
