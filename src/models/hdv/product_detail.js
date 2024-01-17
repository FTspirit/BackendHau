/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const productDetail = sequelize.define(
    'Product_Detail',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      ram: {
        type: DataTypes.TEXT,
      },
      rom: {
        type: DataTypes.TEXT,
      },
      os: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      camera: {
        type: DataTypes.TEXT,
      },
      camera_self: {
        type: DataTypes.TEXT,
      },
      battery: {
        type: DataTypes.INTEGER,
      },
      card: {
        type: DataTypes.TEXT,
      },
      video: {
        type: DataTypes.TEXT,
      },
      quantity_remain: {
        type: DataTypes.TEXT,
      },
      chip: {
        type: DataTypes.TEXT,
      },
      screen: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'Product_Detail',
    }
  );
  productDetail.associate = function (models) {
    productDetail.hasOne(models.Product, {
      foreignKey: 'Order_Detail_Product_Detail_id_fk',
      as: 'order', // Alias to access the associated employees
    });
  };
  return productDetail;
};
