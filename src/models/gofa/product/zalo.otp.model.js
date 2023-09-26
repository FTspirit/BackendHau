/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const zaloOtp = sequelize.define(
    'zaloOtp',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      code: DataTypes.STRING,
      send_time: DataTypes.INTEGER,
      delivery_time: DataTypes.STRING,
      msg_id: DataTypes.STRING,
    },
    {
      tableName: 'zalo_otp',
    }
  );
  zaloOtp.beforeCreate(async (record, options) => {
    record.created_at = utils.getCurrentTimeEpoch();
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  zaloOtp.beforeSave(async (record, options) => {
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  zaloOtp.associate = function (models) {
    // associations can be defined here
  };
  return zaloOtp;
};
