'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kuks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      namaKriteria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      elemen_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'elemen', // Make sure this matches the name of your `elemen` table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      unit_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'units', // Make sure this matches the name of your `unit` table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kuks');
  }
};
