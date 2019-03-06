const utils = require('./utils');

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
  },
  swiftlint: {
    filename: '.swiftlint.yml',
    url: 'https://gist.githubusercontent.com/raulanatol/86f0b59ca97571a25a791efcf112fdb8/raw/4f334f1adfe0e16267645544980ea018709e6b92/.swiftlint.yml'
  }
};

async function typescript() {
  console.log('** Start init!');
  await Promise.all([
    utils.download(ConfigFiles.tslint),
    utils.download(ConfigFiles.prettier),
    utils.download(ConfigFiles.editorconfig)
  ]);
  console.log('** Files updated!');
}

async function swift() {
  console.log('** Start init!');
  await Promise.all([
    utils.download(ConfigFiles.swiftlint),
    utils.download(ConfigFiles.editorconfig)
  ]);
  console.log('** Files updated!');
}

function updateLinters(kind) {
  if (kind === 'typescript') {
    return typescript();
  }

  if (kind === 'swift') {
    return swift();
  }
  console.log('Not implemented', kind);
}

module.exports = {
  updateLinters
};
