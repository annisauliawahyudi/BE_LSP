"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Skemas", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      kode_skema: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      judul_skema: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bidang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      standar_kompetensi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis_skema_id: {
        type: Sequelize.UUID,
        references: {
          model: "JenisSkemas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      mode_skema_id: {
        type: Sequelize.UUID,
        references: {
          model: "ModeSkemas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      dokumen_skema: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dokumen_standar_kompetensi: {
         allowNull: false,
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Skemas");
  },
};
