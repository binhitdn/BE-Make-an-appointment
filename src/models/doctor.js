
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class doctor extends Model {
        static associate(models) {
            // doctor.hasOne(models.users, {
            //     foreignKey: 'doctorId'
            // });
            // doctor.belongsTo(models.allcodes, {
            //     foreignKey: 'gender',
            //     targetKey: 'keyMap',
            //     as: 'genderTypeData'
            // });
            // doctor.belongsTo(models.allcodes, {
            //     foreignKey: 'priceId',
            //     targetKey: 'keyMap',
            //     as: 'priceTypeData'
            // });
            // doctor.belongsTo(models.allcodes, {
            //     foreignKey: 'provinceId',
            //     targetKey: 'keyMap',
            //     as: 'provinceTypeData'
            // });
            
            // doctor.belongsTo(models.allcodes, {
            //     foreignKey: 'positionId',
            //     targetKey: 'keyMap',
            //     as: 'positionTypeData'
            // });
            // doctor.belongsTo(models.allcodes, {
            //     foreignKey: 'paymentId',
            //     targetKey: 'keyMap',
            //     as: 'paymentTypeData'
            // });
            // doctor.belongsTo(models.specialties, {
            //     foreignKey: 'specialtyId',
            //     targetKey: 'id',
            //     as: 'specialtyData'
                
            // });
            // doctor.hasOne(models.allcodes,{
            //     foreignKey: 'keyMap',
            //     as: 'genderTypeData',
            //     sourceKey: 'gender'
            // }
                
            doctor.hasMany(models.schedules, {
                foreignKey: 'doctorId',
                as: 'schedulesData'
            });
            doctor.hasMany(models.doctors_clinics_specialties, {
                foreignKey: 'doctorId',
                as: 'doctorClinicSpecialtyData'
            });
            
            doctor.hasOne(models.users,
                {
                    foreignKey: 'id',
                    as: 'userData',
                    sourceKey: 'userId'
                });
                doctor.belongsTo(models.allcodes, {
                    foreignKey: 'provinceId',
                    as: 'provinceData',
                    targetKey: 'keyMap'
                  });
                    doctor.belongsTo(models.allcodes, {
                        foreignKey: 'paymentId',
                        as: 'paymentData',
                        targetKey: 'keyMap'
                        });
                        doctor.belongsTo(models.allcodes, {
                            foreignKey: 'positionId',
                            as: 'positionData',
                            targetKey: 'keyMap'
                            });

                            doctor.belongsTo(models.specialties, {
                                foreignKey: 'specialtyId',
                                as: 'specialtyData',
                                targetKey: 'id'
                                });

                                doctor.hasMany(
                                    models.bookings,

                                    {
                                        foreignKey: 'doctorId',
                                        as: 'bookingData',
                                        sourceKey: 'id'
                                    }
                                )
                            
                                
                
                
            


            


        }
    };
    doctor.init({
        userId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        // clinicId: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        positionId: DataTypes.STRING,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
        // gender: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'doctors',
    });
    return doctor;
};