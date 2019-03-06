const request = require('request');
const fs = require('fs');

function download({ filename, url }) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    const getRequest = request.get(url);
    getRequest.on('response', (response) => {
      if (response.statusCode !== 200) {
        return reject('Response status was ' + response.statusCode + ' file: ' + url);
      }
      getRequest.pipe(file);
    });

    file.on('finish', () => {
      file.close();
      resolve();
    });

    getRequest.on('error', (err) => {
      fs.unlink(filename);
      return reject(err.message);
    });

    file.on('error', (err) => {
      fs.unlink(filename);
      return reject(err.message);
    });
  });
}

module.exports = {
  download
};
