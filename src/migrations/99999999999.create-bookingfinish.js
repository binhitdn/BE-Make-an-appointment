'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookingfinishs', {     
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        diagnose: {
        type: Sequelize.STRING
        },
        medicine: {
        type: Sequelize.STRING
        },
        note: {
        type: Sequelize.STRING
        },
        bookingId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('bookingfinishs');
  }
};