const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'staging').required(),
    PORT: Joi.number().default(3000),
    HOST_NAME: Joi.string().default('127.0.0.1'),
    LOG_LEVEL: Joi.string().required(),
    LOG_LOCATION: Joi.string().required(),
    PG_HOST_USER: Joi.string().required(),
    PG_PORT_USER: Joi.number().required(),
    PG_USER_NAME_USER: Joi.string().required(),
    PG_PASSWORD_USER: Joi.string().required(),
    PG_DB_USER: Joi.string().required(),
    PG_DIALECT_USER: Joi.string().required(),
    PG_LOGGING_USER: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  host: envVars.HOST_NAME,
  log: {
    level: envVars.LOG_LEVEL,
    location: envVars.LOG_LOCATION,
  },
  db: {
    postgresUSER: {
      host: envVars.PG_HOST_USER,
      port: envVars.PG_PORT_USER,
      userName: envVars.PG_USER_NAME_USER,
      password: envVars.PG_PASSWORD_USER,
      db: envVars.PG_DB_USER,
      dialect: envVars.PG_DIALECT_USER,
      logging: envVars.PG_LOGGING_USER,
    },
  },

};
