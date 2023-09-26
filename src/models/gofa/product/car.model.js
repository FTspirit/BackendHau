/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const Utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const car = sequelize.define(
    'cars',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: DataTypes.BIGINT,
      updated_at: DataTypes.BIGINT,
      license_plate: DataTypes.STRING,
      trigger_lp: DataTypes.BOOLEAN,
      license_plate_parse: DataTypes.STRING,
    },
    {
      tableName: 'cars',
    }
  );
  car.beforeCreate(async (ele, options) => {
    ele.created_at = Utils.getCurrentTimeEpoch();
    ele.updated_at = Utils.getCurrentTimeEpoch();
  });
  car.beforeSave(async (ele, options) => {
    ele.updated_at = Utils.getCurrentTimeEpoch();
  });
  car.associate = function (models) {
    // associations can be defined here
  };
  return car;
};
