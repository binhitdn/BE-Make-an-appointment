'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class replycomment extends Model {
    static associate(models) {
      replycomment.belongsTo(models.comments, {
        foreignKey: 'commentId',
        as: 'commentData',
        targetKey: 'id'
      });
      replycomment.hasOne(models.users, {
        foreignKey: 'id',
        as: 'userData3',
        sourceKey: 'userId'
      });
      
    }
  };
  replycomment.init({
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'replycomments'
  });
  return replycomment;
};