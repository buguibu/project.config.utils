#!/usr/bin/env node
const inquirer = require('inquirer');
const updateNotifier = require('update-notifier');
const pkg = require('./package');
const runner = require('./src/runner.js');

updateNotifier({ pkg }).notify({ isGlobal: true });

const MAIN_ACTION_OTHERS = 0;
const MAIN_ACTION_UPDATE_LINTERS = 1;

const mainPrompt = {
  type: 'list',
  name: 'action',
  message: 'What do you want to do?',
  choices: [
    { name: 'Create/Update linter files', value: MAIN_ACTION_UPDATE_LINTERS },
    { name: 'Others', value: MAIN_ACTION_OTHERS }
  ]
};

inquirer.prompt(mainPrompt).then(({ action }) => {
  switch (action) {
    case MAIN_ACTION_UPDATE_LINTERS:
      return runner.updateLintersPrompt();
    default:
      console.log('Not implemented!', action);
  }
});
