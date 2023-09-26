/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line prettier/prettier
const utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const ZaloToken = sequelize.define(
    'ZaloToken',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
      access_token: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      access_token_expired: DataTypes.INTEGER,
      refresh_token_expired: DataTypes.INTEGER,
      access_token_expire_time: DataTypes.INTEGER,
      refresh_token_expire_time: DataTypes.INTEGER,
    },
    {
      tableName: 'zalo_token',
    }
  );
  ZaloToken.beforeCreate(async (record, options) => {
    record.created_at = utils.getCurrentTimeEpoch();
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  ZaloToken.beforeSave(async (record, options) => {
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  ZaloToken.associate = function (models) {
    // associations can be defined here
  };

  return ZaloToken;
};
