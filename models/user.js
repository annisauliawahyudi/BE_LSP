"use strict";
const { Model } = require("sequelize");
const Bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Username Field Is Empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password Field Is Empty" },
          len: {
            args: [6, 17],
            msg: "Password must be between 6 and 10 characters long",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "asesor", "asesi"),
        allowNull: false,
        validate: {
          notNull: { msg: "Role Field Is Empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await Bcrypt.genSaltSync(10);
            user.password = Bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  
  User.prototype.correctPassword = async (inputPassword, storedPassword) => {
    return await Bcrypt.compareSync(inputPassword, storedPassword);
  };

  return User;
};
