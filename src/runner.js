const request = require('request');
const fs = require('fs');

const ConfigFiles = {
  tslint: {
    filename: 'tslint.json',
    url: 'https://gist.github.com/raulanatol/94d07b4a41745f4b905e1873379b7a72/raw/b6f9d86961e019519833af19f14c8e648b89f406/tslint.json'
  },
  prettier: {
    filename: '.prettierrc',
    url: 'https://gist.githubusercontent.com/raulanatol/1f18d9b6fd8ac369ade8a468ca8e4d51/raw/796e86afba01c12243d73e5e1c4ca0f52745e731/.prettierrc',
  },
  editorconfig: {
    filename: '.editorconfig',
    url: 'https://gist.githubusercontent.com/raulanatol/6b34329356417d805d06ca421bd40a18/raw/80839c9bf56c753d71a9d77e5e3495e47dc9b06f/.editorconfig',
  }
};

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

async function init() {
  console.log('** Start init!');
  await Promise.all([
    download(ConfigFiles.tslint),
    download(ConfigFiles.prettier),
    download(ConfigFiles.editorconfig)
  ]);
  console.log('** Files updated!');
}

const actions = {
  init: init,
};

function run(cli) {
  try {
    const flags = cli.flags;
    const enabledFlags = Object.keys(flags).filter(flag => flags[flag]);
    if (enabledFlags.length > 0) {
      actions[enabledFlags[0]] ? actions[enabledFlags[0]](cli) : cli.showHelp();
    } else {
      cli.showHelp();
    }
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  run,
};
