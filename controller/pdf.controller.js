const puppeteer = require('puppeteer');
const { Usuario } = require('../model/Usuario.model');
const { Gasto } = require('../model/Gasto.model');
const { Categoria } = require('../model/Categoria.model');
const { Op, Sequelize } = require('sequelize');
const fs = require('fs');

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
        const gastos = await Gasto.findAll({
            where: {
              ID_Categoria: ID_Categoria,
              [Op.and]: [
                Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "Fecha"')), Mes)
              ]
            }
          });
        console.log(gastos,"gastos");
        // console.log(req.body,"datos");
        const browser = await puppeteer.launch();
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
    </style>
</head>
<body>
    <div class="invoice-container">
        <header>
            <div class="company-details">
                <div>
                    <h2>Expenses Tracker</h2>
                    <p>CPIFP Alan Turing</p>
                    <p>Málaga</p>                      
                </div>
                <div>
                    <h2>Cliente</h2>
                    <p>{{nombre}}</p>
                    <p>{{correo}}</p>                                      
                </div>
            </div>
        </header>
        <section class="invoice-details">
            <div>
                <p><strong>Fecha:</strong> {{fechaHoy}}</p>
            </div>
        </section>
        <table>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Producto 1</td>
                    <td>2</td>
                    <td>$50.00</td>
                    <td>$100.00</td>
                </tr>
                <tr>
                    <td>Producto 2</td>
                    <td>1</td>
                    <td>$150.00</td>
                    <td>$150.00</td>
                </tr>
            </tbody>
            <tfoot>                
                <tr class="total">
                    <td colspan="3">Total</td>
                    <td>$300.00</td>
                </tr>
            </tfoot>
        </table>
        <p>Gracias por su compra!</p>
    </div>
</body>
</html>
`;

        const htmlModificado = html
        .replace('{{fechaHoy}}', fechaHoy())
        .replace('{{nombre}}', usuario.Nombre)
        .replace('{{correo}}', usuario.Correo)

        await page.setContent(htmlModificado, { waitUntil: 'domcontentloaded' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        fs.writeFileSync('output.pdf', pdfBuffer);
        console.log('PDF creado con éxito!');
    } catch (error) {
        console.error('Error creando PDF:', error);
    }
}

module.exports = {
  exportarPDF
};
