'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('elemen', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nama_elemen: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      unit_id: {  // Kolom foreign key untuk relasi dengan Skema
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'units',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Menambahkan indeks untuk nama_elemen
    await queryInterface.addIndex('elemen', ['nama_elemen']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('elemen');
  },
};
