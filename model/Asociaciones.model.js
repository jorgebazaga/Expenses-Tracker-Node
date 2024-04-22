const {Categoria} = require('./Categoria.model.js');
const {Usuario} = require('./Usuario.model.js');
const {Gasto} = require('./Gasto.model.js');

Usuario.hasMany(Gasto, { foreignKey: "ID_Usuario" });
Gasto.belongsTo(Usuario, { foreignKey: "ID_Usuario" });
Gasto.belongsTo(Categoria, { foreignKey: "ID_Categoria" });
Categoria.hasMany(Gasto, { foreignKey: "ID_Categoria" });

module.exports = { Usuario, Categoria, Gasto };