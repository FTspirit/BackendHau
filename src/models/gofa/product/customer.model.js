/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line prettier/prettier
const utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
      serial_number: DataTypes.STRING,
      district: DataTypes.STRING,
      province: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      lon: DataTypes.FLOAT,
      lat: DataTypes.FLOAT,
      car_ids: DataTypes.ARRAY(DataTypes.INTEGER),
      enable_penalty_notification: DataTypes.BOOLEAN,
    },
    {
      tableName: 'customers',
    }
  );
  Customer.beforeCreate(async (record, options) => {
    record.created_at = utils.getCurrentTimeEpoch();
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  Customer.beforeSave(async (record, options) => {
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  Customer.associate = function (models) {
    // associations can be defined here
  };

  return Customer;
};
