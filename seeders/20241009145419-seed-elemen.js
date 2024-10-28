'use strict';

const { v4 } = require('uuid');  

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ambil ID dari tabel `units`
    const units = await queryInterface.sequelize.query(
      `SELECT id FROM units`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Pastikan tabel `units` memiliki data
    if (units.length === 0) {
      throw new Error('Tidak ada data di tabel units untuk digunakan sebagai referensi');
    }

    const unitId1 = units[0].id; // Gunakan unit pertama sebagai contoh

    await queryInterface.bulkInsert('elemen', [
      {
        id: v4(),
        nama_elemen: 'Elemen 1',
        unit_id: unitId1, // Hubungkan dengan unit_id dari tabel units
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        nama_elemen: 'Elemen 2',
        unit_id: unitId1, // Hubungkan dengan unit_id dari tabel units
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        nama_elemen: 'Elemen 3',
        unit_id: unitId1, // Hubungkan dengan unit_id dari tabel units
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('elemen', null, {});
  }
};
