'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Asesis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      namaAsesi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      validasi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      keterangan: {
         type: Sequelize.ENUM('Sudah divalidasi', 'Belum divalidasi', 'Perlu perbaikan'),
        defaultValue: 'Belum divalidasi'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Asesis');
  }
};
