'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asesi extends Model {
    static associate(models) {
    }
  }
  Asesi.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Username tidak boleh kosong' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password tidak boleh kosong' },
      },
    },
    namaAsesi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Nama Asesi tidak boleh kosong' },
      },
    },
    validasi: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
    keterangan: {
      type: DataTypes.ENUM('Sudah divalidasi', 'Belum divalidasi', 'Perlu perbaikan', 'Tidak aktif'),
      defaultValue: 'Belum divalidasi',
    },
  }, {
    sequelize,
    modelName: 'Asesi',
    tableName: 'Asesis',
    timestamps: true,
  });
  return Asesi;
};
