'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skema extends Model {
    static associate(models) {
      this.belongsTo(models.JenisSkema, { foreignKey: "jenis_skema_id", as: "jenis_skema1" });
      this.belongsTo(models.ModeSkema, { foreignKey: "mode_skema_id", as: "mode_skema1" });
      this.hasMany(models.Unit, { foreignKey: "skema_id", as: "units" }); 
      this.hasMany(models.KelPekerjaan, { foreignKey: 'skema_id', as: 'kel_pekerjaan'});

    }
  }
  
  Skema.init(
    {
       id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      kode_skema: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Kode skema tidak boleh kosong",
          },
        },
      },
      judul_skema: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Judul skema tidak boleh kosong",
          },
        },
      },
      bidang: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Bidang/Area kerja tidak boleh kosong",
          },
        },
      },
      standar_kompetensi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Standar kompetensi tidak boleh kosong",
          },
        },
      },
      jenis_skema_id: {
        type: DataTypes.UUID,
      },
      mode_skema_id: {
        type: DataTypes.UUID,
      },
      dokumen_skema: {
        type: DataTypes.STRING,
      },
      dokumen_standar_kompetensi: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Skema",
    }
  );
  return Skema;
};