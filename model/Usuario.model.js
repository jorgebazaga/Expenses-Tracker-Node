const { Model, DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const crypto = require("crypto");

class Usuario extends Model {}

Usuario.init(
  {
    ID_Usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Correo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Objetivo_Gasto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "Usuario",
    timestamps: false,
  }
);

module.exports = { Usuario };
