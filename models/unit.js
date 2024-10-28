'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    static associate(models) {
      // Relasi ke tabel JudulUnit
      this.belongsTo(models.JudulUnit, { foreignKey: 'judul_units_id', as: 'judul_unit' });
      
      // Relasi ke tabel Skema
      this.belongsTo(models.Skema, { foreignKey: 'skema_id', as: 'skema' });
      
      // Relasi ke tabel Elemen
      this.hasMany(models.Elemen, { foreignKey: 'unit_id', as: 'elemen' });
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
            msg: 'Kode unit tidak boleh kosong',
          },
        },
      },
      judul_units_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'judul_units',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
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
    },
    {
      sequelize,
      modelName: 'Unit',
      tableName: 'units',
    }
  );
  
  return Unit;
};
