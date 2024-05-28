const { Gasto } = require("../model/Gasto.model");

async function crearGasto(req, res) {

  try {
    console.log("Body Gasto: ", req.body);
    const idUsuario = req.params.id

    const nuevoGasto = await Gasto.create({
      ...req.body,
      ID_Usuario: idUsuario
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: nuevoGasto,
      message: "Gasto creado correctamente",
    });

  } catch (error) {
    console.error("Error al crear gasto:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error interno del servidor",
    });
  }
}

async function obtenerGastosID(req, res) {
  try {
    const gastos = await Gasto.findAll({
      where: {
        ID_Usuario: req.params.id
      },
      order: [['Fecha', 'DESC']]
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Gastos obtenidos correctamente",
      data: gastos,
    });
  } catch (error) {
    console.error("Error al obtener los Gastos:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error interno del servidor",
    });
  }
}

async function borrarGasto(req, res) {
  try {
    const gasto = await Gasto.destroy({
      where: {
        ID_Gasto: req.params.id
      }
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Gasto eliminado correctamente",
      data: gasto
    });
  } catch (error) {
    console.error("Error al eliminar el Gasto:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error interno del servidor",
    });
  }
}

module.exports = {
  crearGasto,
  obtenerGastosID,
  borrarGasto
};