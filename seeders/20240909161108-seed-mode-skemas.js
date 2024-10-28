"use strict";
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ModeSkemas", [
      {
        id: v4(),
        mode_skema: "Dokumen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        mode_skema: "Praktik",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ModeSkemas", null, {});
  },
};
