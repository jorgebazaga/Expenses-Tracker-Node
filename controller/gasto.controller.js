const { Gasto } = require("../model/Gasto.model");

async function crearGasto(req, res) {    
    
    try {        
    console.log("Body Gasto: ", req.body);
    const nuevoGasto = await Gasto.create(req.body);
    
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

module.exports = {
    crearGasto
};