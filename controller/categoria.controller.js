const { Categoria } = require("../model/Categoria.model");

async function obtenerCategoria(req,res){
    try {
      const categoria = await Categoria.findAll();
      res.status(200).json({
        ok: true,
        status: 200,
        message: "Categorias obtenidas correctamente",
        data: categoria,
      });
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error interno del servidor",
      });
    }
}

module.exports = {
  obtenerCategoria
};