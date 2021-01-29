const pdf = require('html-pdf');
const fs = require('fs');

exports.generatePdfFromHTML = async function getPdfGenerateStream(cb, options, path) {
  return new Promise((resolve, reject) => {
    pdf.create(cb(), options).toStream((err, stream) => {
      if (err) {
        reject({status: false, data: err});
      }
      stream.pipe(fs.createWriteStream(path));
      setTimeout(() => {
        resolve({status: true, data: 'done'});
      }, 7000);
    });
  });
};

