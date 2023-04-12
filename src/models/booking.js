'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
   
    static associate(models) {
      // bookings.belongsTo(models.patients, {
      //   foreignKey: 'patientId',
      //   targetKey: 'id',
      //   as: 'patientData'
      // })
      bookings.hasOne(models.patients, {
        foreignKey: 'id',
        as: 'patientData',
        sourceKey: 'patientId'
      })
      bookings.belongsTo(models.allcodes, {
        foreignKey: 'statusID',
        targetKey: 'keyMap',
        as: 'statusData'
      })
      bookings.belongsTo(models.allcodes, {
        foreignKey: 'timeType',
        targetKey: 'keyMap',
        as: 'timeTypeData2'
      })
      bookings.belongsTo(models.doctors, {
        foreignKey: 'doctorId',
        targetKey: 'id',
        as: 'doctorData'
      })
      bookings.hasOne(models.ReviewerBookings, {
        foreignKey: 'bookingId',
        as: 'reviewerBookingData',
        sourceKey: 'id'
      })
      bookings.hasOne(models.bookingfinishs, {
        foreignKey: 'bookingId',
        as: 'bookingfinishData',
        sourceKey: 'id'
      })
    }
  };
  bookings.init({
    statusID: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    date: DataTypes.DATE,
    timeType:  DataTypes.STRING,

    
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};