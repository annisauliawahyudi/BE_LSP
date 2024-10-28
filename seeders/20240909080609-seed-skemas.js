"use strict";
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const jenisSkemaId = await queryInterface.rawSelect(
      "JenisSkemas",
      { where: { jenis_skema: "Kompetensi" } },
      ["id"]
    );
    const modeSkemaId = await queryInterface.rawSelect(
      "ModeSkemas",
      { where: { mode_skema: "Dokumen" } },
      ["id"]
    );

    await queryInterface.bulkInsert("Skemas", [
      {
        id: v4(),
        kode_skema: "112",
        judul_skema: "Uji Kompetensi Pengembangan Perangkat Lunak dan Gim",
        bidang: "Teknologi Informasi",
        standar_kompetensi: "Pengembangan Perangkat Lunak",
        dokumen_skema: "test.pdf",
        dokumen_standar_kompetensi: "test.pdf",
        jenis_skema_id: jenisSkemaId,
        mode_skema_id: modeSkemaId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
          id: v4(),
          kode_skema: "113",
          judul_skema: "Uji Kompetensi Desain Komunikasi Visual",
          bidang: "Desain Grafis",
          standar_kompetensi: "Desain Komunikasi Visual",
          dokumen_skema: "test.pdf",
          dokumen_standar_kompetensi: "test.pdf",
          jenis_skema_id: jenisSkemaId, // Foreign key jenis_skema
          mode_skema_id: modeSkemaId,   // Foreign key mode_skema
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Skemas", null, {});
  },
};
