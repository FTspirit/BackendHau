/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.INTEGER,
      },
      total_amount: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: 'Order',
    }
  );
  order.associate = function (models) {
    order.hasMany(models.Order_Detail, {
      foreignKey: 'order_id',
      as: 'orderDetail',
      onDelete: 'CASCADE'
    });
  };
  return order;
};
