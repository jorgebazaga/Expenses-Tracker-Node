const puppeteer = require('puppeteer');
const { Usuario } = require('../model/Usuario.model');
const { Gasto } = require('../model/Gasto.model');
const { Categoria } = require('../model/Categoria.model');
const { Op, Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

function fechaHoy() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

async function exportarPDF(req, res) {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        const { ID_Categoria, Mes } = req.body;
        const currentYear = new Date().getFullYear(); // Obtén el año actual
        const logoBase64 = fs.readFileSync(path.resolve('./assets/images/logoNegro.png'), 'base64');
        const logoSrc = `data:image/png;base64,${logoBase64}`;
        
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

        // Verifica si el array de gastos está vacío
        if (gastos.length === 0) {
            // Si no hay gastos, envía un mensaje de advertencia al frontend
            console.log('No hay datos para exportar WARINING');
            return res.status(400).json({ message: 'No hay datos para exportar', gastos: [] });
            
        }

        const categorias = await Categoria.findAll();

        // Crea un mapa de ID_Categoria a Nombre
        const categoriaMap = {};
        categorias.forEach(categoria => {
            categoriaMap[categoria.ID_Categoria] = categoria.Nombre;
        });

        // Añade el nombre de la categoría a cada gasto
        const gastosConNombres = gastos.map(gasto => {
            return {
                ...gasto.dataValues,
                NombreCategoria: categoriaMap[gasto.ID_Categoria],
                // Formatea la fecha en el formato día/mes/año
                FechaFormateada: new Date(gasto.Fecha).toLocaleDateString('es-ES')
            };
        });

        let tablaGastos = '';
        gastosConNombres.forEach(gasto => {
            tablaGastos += `
            <tr>
                <td>${gasto.Descripcion}</td>
                <td>${gasto.FechaFormateada}</td>
                <td>${gasto.NombreCategoria}</td>
                <td>${gasto.Cantidad} €</td>
            </tr>
            `;
        });

        // Calcular el total de los gastos
        const totalGastos = gastos.reduce((acc, gasto) => acc + Number(gasto.Cantidad), 0);

        const browser = await puppeteer.launch({
            headless: true, // Usar Chromium sin cabeza
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });
        const page = await browser.newPage();

        const html = `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Factura</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                .invoice-container {
                    width: 210mm;
                    height: 297mm;
                    padding: 20mm;
                    margin: auto;
                }
                header {
                    border-bottom: 1px solid #000;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                }
                .company-details, .invoice-details {
                    display: flex;
                    justify-content: space-between;
                }
                .company-details div, .invoice-details div {
                    width: 48%;
                }
                .invoice-details {
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                table, th, td {
                    border: 1px solid #000;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                .total {
                    text-align: right;
                }
                .total td {
                    font-weight: bold;
                }
                /* Estilos adicionales */
                th:nth-child(2), td:nth-child(2), th:nth-child(3), td:nth-child(3) {
                    text-align: center; /* Centrar Fecha y Categoría */
                }
                th:nth-child(4), td:nth-child(4)  {
                    text-align: center; /* Alinear Cantidad a la derecha */
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <header>
                <img src="${logoSrc}" alt="Logo" style="height: 75px;">
                    <div class="company-details">
                        <div>
                            <h2>Expenses Tracker</h2>
                            <p>CPIFP Alan Turing</p>
                            <p>Málaga</p>                      
                        </div>
                        <div>
                            <h2>Cliente</h2>
                            <p>${usuario.Nombre}</p>
                            <p>${usuario.Correo}</p>                                      
                        </div>
                    </div>
                </header>
                <section class="invoice-details">
                    <div>
                        <p><strong>Fecha:</strong> ${fechaHoy()}</p>
                    </div>
                </section>
                <table>
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Categoría</th>
                            <th class="cantidad">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tablaGastos}
                    </tbody>
                    <tfoot>                
                        <tr class="total">
                            <td colspan="3">Total</td>
                            <td class="cantidad">${totalGastos} € </td>
                        </tr>
                    </tfoot>
                </table>        
            </div>
        </body>
        </html>
`;

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        // Enviar el PDF como respuesta para descarga
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.send(pdfBuffer);

        console.log('PDF creado con éxito!');
    } catch (error) {
        console.error('Error creando PDF:', error);
        res.status(500).send('Error creando PDF');
    }
}

module.exports = {
  exportarPDF
};
