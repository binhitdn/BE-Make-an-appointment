
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookingcancelled extends Model {
    static associate(models) {
      
    }
  };
  bookingcancelled.init({
    reason: DataTypes.STRING,
    bookingId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'bookingcancelleds'
  });
  return bookingcancelled;
};