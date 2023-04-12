'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialties extends Model {
  
    static associate(models) {
        specialties.hasMany(models.doctors_clinics_specialties,{
          foreignKey: 'specialtyId'
        })
      specialties.hasMany(models.doctors, {
        foreignKey: 'specialtyId',
        as: 'specialtyData',
        sourceKey: 'id'
      });
    
    }
  };
  specialties.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    image: DataTypes.STRING,
    
    
    
    
  }, {
    sequelize,
    modelName: 'specialties',
  });
  return specialties;
};