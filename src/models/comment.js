'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      
      comment.belongsTo(models.handbooks, {
        foreignKey: 'handbookId',
        as: 'handbookData',
        targetKey: 'id'
      });
      // comment.belongsTo(models.users, {
      //   foreignKey: 'userId',
      //   as: 'userData',
      //   targetKey: 'id'
      // });
      comment.hasOne(models.users, {
        foreignKey: 'id',
        as: 'userData2',
        sourceKey: 'userId'
      });
      comment.hasMany(models.replycomments, {
        foreignKey: 'commentId',
        as: 'replyCommentData',
        sourceKey: 'id',
        
      });
      
    }
  };
  comment.init({
    handbookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comments'
  });
  return comment;
};