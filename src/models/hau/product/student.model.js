/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line prettier/prettier
const utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    'student',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.TEXT,
      birth: DataTypes.TEXT,
      gender: DataTypes.TEXT,
      email: DataTypes.TEXT,
      people_id: DataTypes.TEXT,
      major: DataTypes.TEXT,
      training_system: DataTypes.TEXT,
      school_year: DataTypes.TEXT,
      phone: DataTypes.TEXT,
      bank: DataTypes.TEXT,
      bank_account: DataTypes.TEXT,
      address: DataTypes.TEXT,
      student_code: DataTypes.TEXT,
    },
    {
      tableName: 'student',
    }
  );
  student.beforeCreate(async (record, options) => {
    record.created_at = utils.getCurrentTimeEpoch();
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  student.beforeSave(async (record, options) => {
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  student.associate = function (models) {
    // associations can be defined here
  };

  return student;
};