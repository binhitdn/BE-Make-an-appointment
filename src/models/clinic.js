'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clinics extends Model {
    static associate(models) {
      clinics.hasMany(models.doctors_clinics_specialties, {
        foreignKey: 'clinicId',
        sourceKey: 'id',
        as: 'allDatas'
      })
      
    }
  };
  clinics.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clinics',
  });
  return clinics;
};