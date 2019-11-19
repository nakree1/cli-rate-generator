const chalk = require("chalk");

module.exports = function welcomeMessage() {
  console.log(
    chalk.green(`Welcome to ${chalk.bold('rate-generator')} app!`)
  )
}
