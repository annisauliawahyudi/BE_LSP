'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const units = await queryInterface.sequelize.query(
      `SELECT id FROM units`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const skemas = await queryInterface.sequelize.query(
      `SELECT id FROM skemas`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Pastikan tabel `units` memiliki data
    if (units.length === 0) {
      throw new Error('Tidak ada data di tabel units untuk digunakan sebagai referensi');
    }

    const unitId1 = units[0].id;
    const skemaId = skemas[0].id; 

    await queryInterface.bulkInsert('KelPekerjaans', [
      {
        kelompok_pekerjaan: 'Administrasi Perkantoran',
        unit_id: unitId1,
        skema_id: skemaId, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kelompok_pekerjaan: 'Teknik Informatika',
        unit_id: unitId1,
        skema_id: skemaId, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kelompok_pekerjaan: 'Pemasaran dan Penjualan',
        unit_id: unitId1,
        skema_id: skemaId, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kelompok_pekerjaan: 'Sumber Daya Manusia',
        unit_id: unitId1,
        skema_id: skemaId, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kelompok_pekerjaan: 'Manajemen Proyek',
        unit_id: unitId1,
        skema_id: skemaId, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('KelPekerjaans', null, {});
  }
};
