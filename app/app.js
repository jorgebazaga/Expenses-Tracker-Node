const express = require('express');
const app = express();
const usuarioRoutes = require('../routes/usuario.routes');
const gastoRoutes = require('../routes/gasto.routes');
const categoriaRoutes = require('../routes/categoria.routes');
const pdfRoutes = require('../routes/pdf.routes');
const excelRoutes = require('../routes/excel.routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('This is express');
  } );  

app.use("/",usuarioRoutes);
app.use("/",gastoRoutes);
app.use("/",categoriaRoutes);
app.use("/",pdfRoutes);
app.use("/",excelRoutes);


module.exports = app;