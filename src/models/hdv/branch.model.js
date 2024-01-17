/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const branch = sequelize.define(
    'Branch',
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
      tableName: 'Branch',
    }
  );
  branch.associate = function (models) {
    branch.hasMany(models.Product, {
      foreignKey: 'Product_Branch_id_fk',
      as: 'product', // Alias to access the associated employees
    });
  };
  return branch;
};
