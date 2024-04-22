const express = require('express');
const app = express();
const usuarioRoutes = require('../routes/usuario.routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('This is express');
  } );  

app.use("/",usuarioRoutes);

module.exports = app;