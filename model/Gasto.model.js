const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../services/database");

class Gasto extends Model {}

Gasto.init(
  {
    ID_Gasto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null, 
      primaryKey: true,
      autoIncrement: true,
    },
    Cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ID_Usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Gasto",
    tableName: "Gasto",
    timestamps: false,
  }
);

module.exports = {Gasto};
