/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const orderDetail = sequelize.define(
    'Order_Detail',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'order',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'productDetail',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      into_money: {
        type: DataTypes.FLOAT,
      },
      date: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'Order_Detail',
    }
  );
  orderDetail.associate = function (models) {
    console.log(models);
    orderDetail.belongsTo(models.Order, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE',
    });
    // associations can be defined here
    orderDetail.hasOne(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
      onDelete: 'SET NULL',
    });
  };
  return orderDetail;
};
