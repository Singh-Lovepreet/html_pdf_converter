const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');

const {generatePdfFromHTML} = require('./utils_function');
const htmlDoc = require('./html_doc');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const pdfPath = `./web_doc.pdf`;
  const options = {
    format: 'A4',
    height: '12.00in',
    width: '9.27in',
    'border': {
      'top': '0.8in',
      'right': '0.5in',
      'bottom': '0.5in',
      'left': '0.5in',
    }
  };
  const {status} = await generatePdfFromHTML(htmlDoc, options, pdfPath);
  if (status) {
    const imgData = fs.createReadStream(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    /* Un comment line if you want to download the pdf file*/
    // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    imgData.pipe(res);
  } else {
    res.status(400).send(`Error while Generating file`);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
