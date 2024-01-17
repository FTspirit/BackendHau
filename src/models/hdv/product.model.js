/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        references: {
          model: 'branch',
          key: 'id',
        },
      },
      image: {
        type: DataTypes.STRING,
        references: {
          model: 'category',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      branch_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'Product',
    }
  );
  product.associate = function (models) {
    product.hasMany(models.Product_Detail, {
      foreignKey: 'Product_Detail_Product_id_fk',
      as: 'productDetail', // Alias to access the associated employees
    });
  };
  return product;
};
