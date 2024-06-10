const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'ExpensesTracker API',
    version: '1.0.0',
    description: 'Documentación de la API',
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ["./controller/*.js"], // Rutas a tus controladores
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
