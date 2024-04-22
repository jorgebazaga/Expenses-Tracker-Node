const { Sequelize } = require("sequelize");
const config = require('../database.config.json');

class Database {
  constructor() {
    if (!Database.instance) {
      const dbConfig = config.db;

      this.sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.user,
        dbConfig.password,
        {
          host: dbConfig.host,
          port: dbConfig.port,
          dialect: dbConfig.dialect
        }
      );

      // Verificar la conexión una vez al inicio
      this.sequelize
        .authenticate()
        .then(() => {
          console.log("Conexión DB establecida correctamente.");
        })
        .catch((err) => {
          console.error("No se puede conectar a la base de datos:", err);
        });

      Database.instance = this;
    }

    return Database.instance;
  }
}

module.exports = new Database().sequelize;
