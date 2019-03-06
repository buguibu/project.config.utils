const runner = require('../src/runner.js');

describe('runner', () => {
  test('Should show the help with unexpected command', () => {
    const showHelp = jest.fn();
    const cli = {
      flags: { set: true },
      showHelp
    };
    runner.run(cli);
    expect(showHelp).toBeCalledTimes(1);
  });
});
