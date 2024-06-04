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

async function crearCategoria(req,res){
    try {
      const categoria = await Categoria.create(req.body);
      res.status(200).json({
        ok: true,
        status: 200,
        message: "Categoria creada correctamente",
        data: categoria,
      });
    } catch (error) {
      console.error("Error al crear la categoria:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error interno del servidor",
      });
    }
}

async function actualizarCategoria(req,res){
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: "Categoria no encontrada",
        });
      }
  
      await categoria.update(req.body);
  
      res.status(200).json({
        ok: true,
        status: 200,
        message: "Categoria actualizada correctamente",
        data: categoria,
      });
    } catch (error) {
      console.error("Error al actualizar la categoria:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error interno del servidor",
      });
    }
}

async function borrarCategoria(req,res){
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: "Categoria no encontrada",
        });
      }
  
      await categoria.destroy();
  
      res.status(200).json({
        ok: true,
        status: 200,
        message: "Categoria eliminada correctamente",
      });
    } catch (error) {
      console.error("Error al borrar la categoria:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error interno del servidor",
      });
    }
}

module.exports = {
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
};