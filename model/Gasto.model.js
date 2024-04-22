const { Model, DataTypes } = require("sequelize");
const sequelize = require("../services/database");

class Gasto extends Model {}

Gasto.init(
  {
    ID_Gasto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Cantidad: {
      type: DataTypes.STRING(255),
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
  },
  {
    sequelize,
    modelName: "Gasto",
    tableName: "Gasto",
    timestamps: false,
  }
);

module.exports = { Gasto };
