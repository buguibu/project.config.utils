#!/usr/bin/env node
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package');
const runner = require('./src/runner.js');

updateNotifier({ pkg }).notify({ isGlobal: true });

const cli = meow(`
    Usage
        $ project.config.utils
    Options
        --init, -i         Initialize the project
    Examples
        $ project.config.utils -i
`, {
  flags: {
    init: { type: 'boolean', alias: 'i' },
  }
});

runner.run(cli);
