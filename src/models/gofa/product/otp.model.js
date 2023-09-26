module.exports = (sequelize, DataTypes) => {
  const otp = sequelize.define(
    'otp',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: DataTypes.INTEGER,
      code: DataTypes.STRING,
      expired_time: DataTypes.INTEGER,
      msg_id: DataTypes.STRING,
      delivery_time: DataTypes.STRING,
    },
    {
      tableName: 'otp',
    }
  );
  otp.associate = function (models) {
    // associations can be defined here
  };
  return otp;
};
