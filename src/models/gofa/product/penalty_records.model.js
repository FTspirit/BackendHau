/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const Utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const penalty_records = sequelize.define(
    'penalty_records',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: DataTypes.BIGINT,
      updated_at: DataTypes.BIGINT,
      license_plate: DataTypes.STRING,
      license_color: DataTypes.STRING,
      status: DataTypes.STRING,
      time: DataTypes.STRING,
      address: DataTypes.STRING,
      action: DataTypes.STRING,
      addr_penalty: DataTypes.STRING,
      addr_process_penalty: DataTypes.STRING,
      penalty_lp_parse: DataTypes.STRING,
    },
    {
      tableName: 'penalty_records',
    }
  );
  penalty_records.beforeCreate(async (record, options) => {
    record.created_at = Utils.getCurrentTimeEpoch();
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  penalty_records.beforeSave(async (record, options) => {
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  penalty_records.associate = function (models) {
    // associations can be defined here
  };
  return penalty_records;
};
