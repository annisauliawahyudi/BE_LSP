"use strict";
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("JenisSkemas", [
      {
        id: v4(),
        jenis_skema: "Kompetensi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        jenis_skema: "Sertifikasi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("JenisSkemas", null, {});
  },
};
