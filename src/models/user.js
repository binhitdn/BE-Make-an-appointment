'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // users.belongsTo(models.allcodes, {
      //   foreignKey: 'positionId',
      //   targetKey: 'keyMap',
      //   as: 'positionData'
      // })
      // users.belongsTo(models.allcodes, {
      //   foreignKey: "gender",
      //   targetKey: "keyMap",
      //   as: "genderData"
      // })
      // users.hasOne(models.doctors, {
      //   foreignKey: 'userId',
      // })
      // users.hasOne(models.admins, {
      //   foreignKey: 'userId',
      // })
      // users.hasOne(models.patients, {
      //   foreignKey: 'userId',
      // })
      users.hasOne(models.doctors);
      users.hasOne(models.patients,{
        foreignKey: 'userId',
        as: 'patientData',
        sourceKey: 'id'
      
      });


      users.belongsTo(models.allcodes, {
        foreignKey: 'gender',
        as: 'genderData',
        targetKey: 'keyMap'
      });
      users.belongsTo(models.allcodes, {
        foreignKey: 'roleId',
        as: 'roleData',
        targetKey: 'keyMap'
      });
      users.belongsTo(models.replycomments, {
        foreignKey: 'id',
        as: 'userData3',
        sourceKey: 'userId'
      });
      // users.hasMany(models.comments, {
      //   foreignKey: 'userId',
      //   as: 'commentData',
      //   sourceKey: 'id'
      // });
      users.hasMany(models.comments,
        
        {
          foreignKey: 'userId',
          as: 'commentData2',
          sourceKey: 'id'
        })

      
    }
  };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    phone: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users'
  });
  return users;
};