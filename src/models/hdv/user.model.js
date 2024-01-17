/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'role',
          key: 'id',
        },
      },
    },
    {
      tableName: 'User',
    }
  );
  user.associate = function (models) {
    user.belongsTo(models.Role, {
      foreignKey: 'role_id',
      targetKey: 'id',
      as: 'role', // Alias to access the associated role
    });
    user.hasMany(models.Order, {
      foreignKey: 'user_id',
      as: 'order', // Alias to access the associated employees
    });
  };
  return user;
};
