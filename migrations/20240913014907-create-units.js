'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('units', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      kode_unit: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      judul_unit_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'judul_units',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      skema_id: {  // Kolom foreign key untuk relasi dengan Skema
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Skemas',
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('units');
  },
};
