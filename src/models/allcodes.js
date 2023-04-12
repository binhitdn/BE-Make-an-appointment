'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allcodes extends Model {
    static associate(models) {
      
      
      allcodes.hasMany(models.schedules, {
        foreignKey: 'timeType',
        as: 'timeTypeData'
      });
      allcodes.hasMany(models.bookings, {
        foreignKey: 'timeType',
        as: 'timeTypeData2'
      });
      allcodes.hasMany(models.bookings, {
        foreignKey: 'statusID',
        as: 'statusData'
      });
      // allcodes.hasMany(models.doctors, {
      //   foreignKey: 'gender',
      //   as: 'genderTypeData'
      // })
      // allcodes.hasMany(models.doctors, {
      //   foreignKey: 'priceId',
      //   as: 'priceTypeData'
      // })
      // allcodes.hasMany(models.doctors, {
      //   foreignKey: 'provinceId',
      //   as: 'provinceTypeData'
      // })
      // allcodes.hasMany(models.doctors, {
      //   foreignKey: 'paymentId',
      //   as: 'paymentTypeData'
      // })
      // allcodes.hasMany(models.doctors, {
      //   foreignKey: 'positionId',
      //   as: 'positionTypeData'
      // })
      allcodes.hasMany(models.users, 
        {
        foreignKey: 'gender',
        as: 'genderData',
        sourceKey: 'keyMap'

        }
        )
      allcodes.hasMany(models.users,
        {
          foreignKey: 'roleId',
          as: 'roleData',
          sourceKey: 'keyMap'
        }
        )
      allcodes.hasMany(models.doctors,
        {
          foreignKey: 'provinceId',
          as: 'provinceData',
          sourceKey: 'keyMap'
        }
        )
      allcodes.hasMany(models.doctors,
        {
          foreignKey: 'paymentId',
          as: 'paymentData',
          sourceKey: 'keyMap'
        }
      ) 
      allcodes.hasMany(models.doctors,
        {
          foreignKey: 'positionId',
          as: 'positionData',
          sourceKey: 'keyMap'
        }
      )
      allcodes.hasMany(models.doctors,
        {
          foreignKey: 'priceId',
          as: 'priceData',
          sourceKey: 'keyMap'
          

          }
      )





    }
  };
  allcodes.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING


  }, {
    sequelize,
    modelName: 'allcodes',
  });
  return allcodes;
};