const ExcelJS = require('exceljs');
const { Usuario } = require('../model/Usuario.model');
const { Gasto } = require('../model/Gasto.model');
const { Categoria } = require('../model/Categoria.model');
const { Op, Sequelize } = require('sequelize');

async function exportToExcel(req, res, sheetName) {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        const { ID_Categoria, Mes } = req.body;
        const currentYear = new Date().getFullYear(); // Obtén el año actual
        
        let whereConditions = {
            [Op.and]: [
                Sequelize.literal(`YEAR(Fecha) = ${currentYear}`), // Año actual es siempre parte de la condición
                { ID_Usuario: usuario.ID_Usuario } // Asegúrate de que el ID del usuario esté en las condiciones
            ]
        };
        
        // Añade condiciones adicionales basadas en los valores de ID_Categoria y Mes
        if (ID_Categoria) {
            whereConditions.ID_Categoria = ID_Categoria;
        }
        if (Mes) {
            whereConditions[Op.and].push(Sequelize.literal(`MONTH(Fecha) = ${Mes}`));
        }
        
        // Realiza la consulta con las condiciones dinámicas
        const gastos = await Gasto.findAll({
            where: whereConditions
        });

        // Obtener todas las categorías
        const categorias = await Categoria.findAll();

        // Crear un mapa de ID_Categoria a Nombre
        const categoriaMap = {};
        categorias.forEach(categoria => {
            categoriaMap[categoria.ID_Categoria] = categoria.Nombre; // Asegúrate de usar la clave correcta
        });

        // Añadir el nombre de la categoría a cada gasto
        const gastosConNombres = gastos.map(gasto => {
            return {
                ...gasto.dataValues,
                NombreCategoria: categoriaMap[gasto.ID_Categoria]
            };
        });

        // Crear un nuevo libro de trabajo
        const workbook = new ExcelJS.Workbook();

        // Añadir una nueva hoja de cálculo
        const worksheet = workbook.addWorksheet(sheetName);

        // Añadir columnas
        worksheet.columns = [
            { header: 'Descripción', key: 'Descripcion' },
            { header: 'Fecha', key: 'Fecha' },
            { header: 'Categoría', key: 'NombreCategoria' },
            { header: 'Cantidad', key: 'Cantidad' }
        ];

        // Añadir filas
        gastosConNombres.forEach(gasto => {
            worksheet.addRow({
                Descripcion: gasto.Descripcion,
                Fecha: gasto.Fecha,
                NombreCategoria: gasto.NombreCategoria, // Asegúrate de incluir la relación de categoría
                Cantidad: gasto.Cantidad
            });
        });

        // Escribir el libro de trabajo a un buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Configurar la respuesta para la descarga del archivo
        res.setHeader('Content-Disposition', 'attachment; filename="gastos.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

        console.log('Archivo Excel enviado exitosamente');
    } catch (error) {
        console.error('Error al crear el archivo Excel:', error);
        res.status(500).send('Error al crear el archivo Excel');
    }
}

module.exports = {
    exportToExcel
};
