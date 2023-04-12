'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctors', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',          
                }
            },
            specialtyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'specialties',
                    key: 'id'
                }
            },
            positionId: {
                type: Sequelize.STRING
            },
            
            contentHTML: {
                type: Sequelize.TEXT('long')           
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            description: {
                type: Sequelize.TEXT('long')           
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            note: {
                type: Sequelize.STRING,

            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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
        await queryInterface.dropTable('doctors');
    }
};