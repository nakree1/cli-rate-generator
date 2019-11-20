const chalk = require('chalk');

module.exports = function (err, message) {
  console.log(
    chalk.red.bold(message)
  );
  if (err.response) {
    const { status, data, statusText, config: { data: payload } } = err.response;
    console.error(
      chalk.red(`[${chalk.bold(status)}] ${statusText}: ${chalk.cyan(data)}`)
    );
    console.error(
      chalk.magenta('Payload: ', payload)
    );
  } else {
    console.log(
      chalk.red(err)
    );
  }
};
