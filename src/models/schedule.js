'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    static associate(models) {
      schedules.belongsTo(models.allcodes, {
        foreignKey: 'timeType',
        targetKey: 'keyMap',
        as: 'timeTypeData'
      })
      schedules.belongsTo(models.doctors, {
        foreignKey: 'doctorId',
        targetKey: 'id',
        as: 'doctorData'
      })
    }
  };
  schedules.init({
    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.DATE,
    timeType: DataTypes.STRING,
    doctorId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'schedules',
  });
  return schedules;
};