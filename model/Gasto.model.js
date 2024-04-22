const { Model, DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Usuario = require("./Usuario.model");
const Categoria = require("./Categoria.model");

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
  }
);

Gasto.belongsTo(Usuario, { foreignKey: "ID_Usuario" });
Gasto.belongsTo(Categoria, { foreignKey: "ID_Categoria" });

module.exports = { Gasto };