"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("documents", "updated_at", {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn("documents", "updated_at");
    }
};