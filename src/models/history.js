'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class histories extends Model {
    static associate(models) {
      
    }
  };
  histories.init({
    partiendId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    files: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'histories',
  });
  return histories;
};