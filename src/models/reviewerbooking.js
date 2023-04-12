'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewerBooking extends Model {
    static associate(models) {
      ReviewerBooking.belongsTo(models.bookings, {
        foreignKey: 'bookingId',
        targetKey: 'id',
        as: 'bookingData'
      })
    }
  };
  ReviewerBooking.init({
    bookingId: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewerBookings',
  });
  return ReviewerBooking;
};