"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("documents", "application_id", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "applications",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("documents", "application_id", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "applications",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    }
};
