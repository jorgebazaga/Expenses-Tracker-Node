const { Gasto } = require("../model/Gasto.model");

async function crearGasto(req, res) {

  try {
    console.log("Body Gasto: ", req.body);
    const idUsuario = req.params.id

    console.log("EL nuevo gasto es: ", req.body)
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

async function obtenerGastoID(req, res) {
  try {
    const gasto = await Gasto.findByPk(req.params.id);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Gasto obtenido correctamente",
      data: gasto,
    });
  } catch (error) {
    console.error("Error al obtener el Gasto:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error interno del servidor",
    });
  }
}

async function editarGasto(req, res) {
  try {
    console.log("Body Gasto: ", req.body);
    console.log("ID Gasto: ", req.params.id);

    // Verifica que el cuerpo de la solicitud tenga la estructura correcta
    if (!req.body || !req.params.id) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Datos insuficientes para actualizar el gasto",
      });
    }

    // Realiza la actualización
    const [numberOfAffectedRows, affectedRows] = await Gasto.update(req.body, {
      where: {
        ID_Gasto: req.params.id
      },
      returning: true // Para obtener los registros actualizados en affectedRows
    });

    // Verifica si la actualización se realizó
    if (numberOfAffectedRows === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Gasto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Gasto actualizado correctamente",
      data: affectedRows[0] // Devuelve el primer registro actualizado
    });
  } catch (error) {
    console.error("Error al actualizar el Gasto:", error);
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
  borrarGasto,
  obtenerGastoID,
  editarGasto
};