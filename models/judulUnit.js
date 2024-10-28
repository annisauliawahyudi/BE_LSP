'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JudulUnit extends Model {
    static associate(models) {
      
      this.hasMany(models.Unit, { foreignKey: 'judul_unit_id', as: 'units' });
    }
  }

  JudulUnit.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      judul_unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'JudulUnit',
      tableName: 'judul_units',
    }
  );
  return JudulUnit;
};
