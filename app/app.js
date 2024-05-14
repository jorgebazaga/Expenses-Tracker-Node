const express = require('express');
const app = express();
const usuarioRoutes = require('../routes/usuario.routes');
const gastoRoutes = require('../routes/gasto.routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('This is express');
  } );  

app.use("/",usuarioRoutes);
app.use("/",gastoRoutes);

module.exports = app;