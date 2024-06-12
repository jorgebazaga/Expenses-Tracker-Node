const express = require('express');
const app = express();
const usuarioRoutes = require('../routes/usuario.routes');
const gastoRoutes = require('../routes/gasto.routes');
const categoriaRoutes = require('../routes/categoria.routes');
const pdfRoutes = require('../routes/pdf.routes');
const excelRoutes = require('../routes/excel.routes');
const correoRoutes = require('../routes/correo.routes')
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());
app.use(cors());

// Define las opciones de Swagger
const swaggerDefinition = {
  info: {
    title: 'ExpensesTracker API',
    version: '1.0.0',
    description: 'Documentación de la API',
  },
  basePath: '/', // Base path de tu API
};

// Configura las opciones de Swagger
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Rutas a tus archivos de rutas (controladores)
};

// Genera la documentación de Swagger
const swaggerSpec = swaggerJsdoc(options);

// Agrega la ruta para servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta raíz de la aplicación
app.get('/', (req, res) => {
  res.send('This is express');
});

// Rutas de tu API
app.use('/', usuarioRoutes);
app.use('/', gastoRoutes);
app.use('/', categoriaRoutes);
app.use('/', pdfRoutes);
app.use('/', excelRoutes);
app.use('/', correoRoutes);

module.exports = app;
