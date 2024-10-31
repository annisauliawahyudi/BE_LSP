"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KelPekerjaan extends Model {
    static associate(models) {
      // Menambahkan relasi dengan tabel `unit`
      KelPekerjaan.belongsTo(models.Unit, { foreignKey: "unit_id", as: "units" });
      // KelPekerjaan.hasMany(models.Skema, { as: 'skemas', foreignKey: 'kelompokPekerjaanId' });
      this.belongsTo(models.Skema, { foreignKey: 'skema_id', as: 'skema' });

    }
  }

  KelPekerjaan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    kelompok_pekerjaan: DataTypes.STRING,
    skema_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'skemas',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Menambahkan default value untuk createdAt
    },
  },
  {
    sequelize,
    modelName: "KelPekerjaan",
    tableName: "KelPekerjaans",
    timestamps: false,
  }
);


  return KelPekerjaan;
};
