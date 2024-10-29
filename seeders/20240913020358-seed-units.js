'use strict';

const { v4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil id dari `judul_units`
    const judulUnits = await queryInterface.sequelize.query(
      `SELECT id FROM judul_units`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const skemas = await queryInterface.sequelize.query(
      `SELECT id FROM skemas`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // const kelPekerjaan = await queryInterface.sequelize.query(
    //   `SELECT id FROM KelPekerjaans`, // Ambil kelompokPekerjaanId dari tabel kel_pekerjaan
    //   { type: queryInterface.sequelize.QueryTypes.SELECT }
    // );

    if (judulUnits.length === 0 || skemas.length === 0 ) {
      throw new Error('Tidak ada data yang cukup di tabel terkait untuk digunakan sebagai referensi');
    }

    // Ambil id dari `judul_units`, `skema`, dan `kel_pekerjaan`
    const judulUnitId1 = judulUnits[0].id; 
    const judulUnitId2 = judulUnits[1].id; 
    const skemaId = skemas[0].id; 
    // const kelompokPekerjaanId = kelPekerjaan[0].id; // Ambil kelompokPekerjaanId yang pertama

    await queryInterface.bulkInsert('units', [
      {
        id: v4(),
        kode_unit: 'Kode Unit 1',
        judul_unit_id: judulUnitId1, 
        skema_id: skemaId, 
        // kelompokPekerjaanId, // Menambahkan kelompokPekerjaanId untuk relasi
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        kode_unit: 'Kode Unit 2',
        judul_unit_id: judulUnitId2, 
        skema_id: skemaId, 
        // kelompokPekerjaanId, // Menambahkan kelompokPekerjaanId untuk relasi
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('units', null, {});
  },
};
