"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JenisSkema extends Model {
    static associate(models) {
      this.hasMany(models.Skema, { foreignKey: "jenis_skema_id", as: "skemas" });
    }
  }
  JenisSkema.init(
    {
       id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      jenis_skema: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "JenisSkema",
    }
  );
  return JenisSkema;
};
