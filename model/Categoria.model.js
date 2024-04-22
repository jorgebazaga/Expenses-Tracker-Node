const { Model, DataTypes } = require("sequelize");
const sequelize = require("../services/database");

class Categoria extends Model {}

Categoria.init(
  {
    ID_Categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Categoria",
    tableName: "Categoria",
    timestamps: false,
  }
);


module.exports = { Categoria };
