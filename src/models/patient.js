
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class patient extends Model {
        static associate(models) {
            // patient.hasOne(models.users, {
            //     foreignKey: 'userId',
            // })
            // patient.hasMany(models.bookings, {
            //     foreignKey: 'patientId',
            // })
            patient.belongsTo(models.bookings, {
                foreignKey: 'id',
                as: 'patientData',
                sourceKey: 'patientId'
            })
            patient.hasOne(models.users, {
                foreignKey: 'id',
                as: 'userData',
                sourceKey: 'userId'
            })
            
            


        }
    };
    patient.init({
        userId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'patients',
    });
    return patient;
};