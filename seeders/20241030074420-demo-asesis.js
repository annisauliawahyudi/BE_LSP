  'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Asesis', [
        {
          username: 'ase001',
          password: '$2b$10$KIXxSmIJ6b/Sb8jR6yV3BeAf5UBZoCmEqm/7mD/6z0VYmxH1Kw/mi', 
          namaAsesi: 'Asesi Satu',
          validasi: 'Dokumen sudah lengkap ',
          keterangan: 'Sudah divalidasi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'ase002',
          password: '$2b$10$YIXuSmIJ6b/Sb8jR6yV3BeAf5UBZoCmEqm/7mD/6z0VYmxH1Kw/mi', 
          namaAsesi: 'Asesi Dua',
          validasi: 'Dokumen tidak lengkap',
          keterangan: 'Belum divalidasi',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Asesis', null, {});
    }
  };
