/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line prettier/prettier
const utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      student_code: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      user_name: DataTypes.TEXT,
      password: DataTypes.TEXT,
      is_admin: DataTypes.BOOLEAN,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
    },
    {
      tableName: 'user',
    }
  );
  user.beforeCreate(async (record, options) => {
    record.created_at = utils.getCurrentTimeEpoch();
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  user.beforeSave(async (record, options) => {
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  user.associate = function (models) {
    // associations can be defined here
  };

  return user;
};
