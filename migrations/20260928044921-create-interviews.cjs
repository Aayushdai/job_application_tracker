'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("interviews",{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      application_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "applications",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      type: {
        type: Sequelize.ENUM(
          "phone",
          "technical",  
          "behavioral",
          "hr",
          "final",
          "other"
        ),
        allowNull: false
      },
      scheduled_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      meeting_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          "scheduled",
          "completed",
          "canceled",
          "rescheduled"
        ),
        allowNull: false,
        defaultValue: "scheduled"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false, 
        // defaultValue: "scheduled"
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("interviews");
  }
};
