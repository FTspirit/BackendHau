/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Role',
    }
  );
  role.associate = function (models) {
    role.hasMany(models.User, {
      foreignKey: 'role_id',
      as: 'user',
    });
  };
  return role;
};
