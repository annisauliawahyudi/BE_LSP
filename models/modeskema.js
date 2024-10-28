"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModeSkema extends Model {
    static associate(models) {
      this.hasMany(models.Skema, { foreignKey: "mode_skema_id", as: "skemas" });
    }
  }
  ModeSkema.init(
    {
       id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      mode_skema: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ModeSkema",
    }
  );
  return ModeSkema;
};
