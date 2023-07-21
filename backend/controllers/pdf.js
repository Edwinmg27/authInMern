const pdfMake = require('pdfmake');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('input.json', 'utf8'));

const headers = Object.keys(data[0]);
const body = data.map(row => headers.map(header => row[header]));

const docDefinition = {
    content: [
        {
            table: {
                headerRows: 1,
                widths: headers.map(() => '*'),
                body: [headers, ...body]
            }
        }
    ]
};

const printer = new pdfMake();
const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('output.pdf'));
pdfDoc.end();