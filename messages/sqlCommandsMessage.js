const chalk = require("chalk");
const { INVITE_TOKENS_FILE } = require('../utils/constants');

module.exports = function sqlCommandsMessage(commands) {
  console.log(chalk.cyan('---------------------------'));
  console.log(chalk.bgCyan.black.bold('Generated SQL Commands:\n'));
  console.log(chalk.cyan(commands));
  console.log(chalk.cyan('---------------------------'));

  console.log(chalk.green.bold(`Please, use this commands to get tokens and activate users.\nThen, fill the file (${INVITE_TOKENS_FILE}) with tokens`))
};
