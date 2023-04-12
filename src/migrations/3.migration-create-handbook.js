'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('handbooks', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT('long'),
                allowNull: false
            },
            view: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            like: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            poster: {
                type: Sequelize.STRING,
                defaultValue: 'Ẩn danh'
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            image: {
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
        await queryInterface.dropTable('handbooks');
    }
};