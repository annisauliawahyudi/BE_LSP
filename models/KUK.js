'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class KUK extends Model {
  static associate(models) {
    this.belongsTo(models.Elemen, { foreignKey: 'elemen_id', as: 'elemen' }); // Relasi baru
  }
}

 KUK.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    namaKriteria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    elemen_id: { // Kolom foreign key untuk relasi dengan Elemen
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'elemen',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'KUK',
    tableName: 'kuks', 
    timestamps: true,
  }
);

return KUK;
};
