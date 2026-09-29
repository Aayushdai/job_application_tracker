'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("follow_ups", "title", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Follow-up"
    });
    await queryInterface.addColumn("follow_ups", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("follow_ups", " status");
    await queryInterface.removeColumn("follow_ups", "title");
  }
};
