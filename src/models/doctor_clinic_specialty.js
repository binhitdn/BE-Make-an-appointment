
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctors_clinics_specialties extends Model {
    static associate(models) {
      
        doctors_clinics_specialties.belongsTo(models.specialties, {
          foreignKey: 'specialtyId',
          targetKey: 'id',
          as: 'specialtyData'
        })
      doctors_clinics_specialties.belongsTo(models.clinics, {
        foreignKey: 'clinicId',
        targetKey: 'id',
        as: 'clinicData'
      })
      doctors_clinics_specialties.belongsTo(models.doctors, {
        foreignKey: 'doctorId',
        sourceKey: 'id',
        as: 'doctorData'
      })
    }
  };
  doctors_clinics_specialties.init({
    doctorId:DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'doctors_clinics_specialties',
  });
  return doctors_clinics_specialties;
};