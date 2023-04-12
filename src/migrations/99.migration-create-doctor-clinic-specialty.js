'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('doctors_clinics_specialties', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'doctors',
          key: 'id'
        }
      },
      clinicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clinics',
          key: 'id'
        },

      },
      specialtyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'specialties',
          key: 'id'
        }
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
    await queryInterface.dropTable('doctors_clinics_specialties');
  }
};