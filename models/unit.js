"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    static associate(models) {
      // Relasi ke tabel JudulUnit
      this.belongsTo(models.JudulUnit, { foreignKey: "judul_unit_id", as: "judul_unit" });

      // Relasi ke tabel Skema
      this.belongsTo(models.Skema, { foreignKey: "skema_id", as: "skema" });

      // Relasi ke tabel Elemen
      this.hasMany(models.Elemen, { foreignKey: "unit_id", as: "elemen" });

      // Relasi ke tabel KelPekerjaan
      this.hasMany(models.KelPekerjaan, { foreignKey: "unit_id", as: "kelompok_pekerjaan" });

      // Unit.belongsTo(JudulUnit, {
      //   foreignKey: "judul_unit_id",
      //   as: "judul_unit", // Pastikan alias ini cocok
      // });
      // this.belongsTo(models.JudulUnit, { foreignKey: "judul_unit_id", as: "judul_unit" });
    }
  }

  Unit.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      kode_unit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Kode unit tidak boleh kosong",
          },
        },
      },
      judul_unit_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "judul_units",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      skema_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "skemas",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      // kelompokPekerjaanId: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'kel_pekerjaan',
      //     key: 'id',
      //   },
      //   onDelete: 'SET NULL',  // Atur sesuai kebutuhan, misalnya 'CASCADE' atau 'SET NULL'
      //   onUpdate: 'CASCADE',
      // },
    },
    {
      sequelize,
      modelName: "Unit",
      tableName: "units",
    }
  );

  return Unit;
};
