/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'Category',
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
      tableName: 'Category',
    }
  );
  category.associate = function (models) {
    category.hasMany(models.Product, {
      foreignKey: 'Product_Category_id_fk',
      as: 'product', // Alias to access the associated employees
    });
  };
  return category;
};
