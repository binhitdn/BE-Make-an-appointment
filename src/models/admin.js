
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class admin extends Model {
        static associate(models) {
            // admin.hasOne(models.users, {
            //     foreignKey: 'userId',

            //     })

        }
    };
    admin.init({
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'admins',
    });
    return admin;
};