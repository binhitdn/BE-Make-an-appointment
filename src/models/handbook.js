
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class handbook extends Model {
        static associate(models) {
            // handbook.belongsTo(models.comments, {
            //     // foreignKey: 'handbookId',
            //     // as: 'commentData',
            //     // targetKey: 'id'
            // });
            handbook.hasMany(models.comments, {
                foreignKey: 'handbookId',
                as: 'commentData',
                sourceKey: 'id'
            });
            
        }
    };
    handbook.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT('long'),
        view: DataTypes.INTEGER,
        like: DataTypes.INTEGER,
        poster: DataTypes.STRING,
        status: DataTypes.INTEGER,
        image: DataTypes.STRING,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'handbooks',
    });
    return handbook;
};