'use strict';

const { v4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('judul_units', [
      {
        id: v4(),
        judul_unit: 'Contoh Judul Unit 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        judul_unit: 'Contoh Judul Unit 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('judul_units', null, {});
  },
};
