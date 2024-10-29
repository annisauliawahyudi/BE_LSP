'use strict';

const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ambil id dari tabel elemen
    const elemen = await queryInterface.sequelize.query(
      `SELECT id FROM elemen`, // Ganti 'elemen' dengan nama tabel yang tepat
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (elemen.length === 0) {
      throw new Error('Tidak ada data di tabel elemen untuk digunakan sebagai referensi');
    }

    // Ambil id dari elemen
    const elemenId = elemen[0].id; // Mengambil id elemen yang pertama

    // Ambil id dari tabel unit
    const units = await queryInterface.sequelize.query(
      `SELECT id FROM units`, // Ganti 'units' dengan nama tabel yang tepat
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (units.length === 0) {
      throw new Error('Tidak ada data di tabel units untuk digunakan sebagai referensi');
    }

    // Ambil id dari unit
    const unitId = units[0].id; // Mengambil id unit yang pertama

    await queryInterface.bulkInsert('kuks', [
      {
        id: v4(),  
        namaKriteria: 'Kriteria 1',
        elemen_id: elemenId, // Sertakan elemenId
        unit_id: unitId,     // Sertakan unitId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),  
        namaKriteria: 'Kriteria 2',
        elemen_id: elemenId, // Sertakan elemenId
        unit_id: unitId,     // Sertakan unitId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('kuks', null, {});
  }
};
