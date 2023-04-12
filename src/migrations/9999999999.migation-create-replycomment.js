'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('replycomments', {     
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        userId: {
        type: Sequelize.INTEGER
        },
        commentId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'comments',
            key: 'id'
        }
        
        },
        content: {
        type: Sequelize.STRING
        },

        
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('replycomments');
  }
};