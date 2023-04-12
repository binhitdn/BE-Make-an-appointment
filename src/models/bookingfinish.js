
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookingfinish extends Model {
    static associate(models) {
      bookingfinish.belongsTo(models.bookings, {
        foreignKey: 'bookingId',
        targetKey: 'id',
        as: 'bookingfinishData'
      })
    }
  };
  bookingfinish.init({
    diagnose: DataTypes.STRING,
    medicine: DataTypes.STRING,
    note: DataTypes.STRING,
    bookingId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'bookingfinishs'
  });
  return bookingfinish;
};