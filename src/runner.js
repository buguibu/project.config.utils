const inquirer = require('inquirer');
const linters = require('./linters');

function updateLintersPrompt() {
  inquirer.prompt({
    type: 'list',
    name: 'kind',
    message: 'What kind of project?',
    choices: ['Typescript', 'Swift', 'Standard'],
    filter: function (val) {
      return val.toLowerCase();
    }
  }).then(({ kind }) => linters.updateLinters(kind));
}

module.exports = {
  updateLintersPrompt
};
