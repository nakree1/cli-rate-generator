const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');

const { CONFIG_PATH } = require('../utils/constants');

const question = {
  name: 'tokenData',
  type: 'editor',
  message: 'Paste generated tokens here:'
};

const makeValidate = (userCount) => (input) => {
  const length = input.split('\n');

  if (Number(length) === Number(userCount)) {
    return true
  }

  return chalk.yellow('Tokens count do not match with user count');
};


module.exports = function() {
  const config = fs.readJsonSync(CONFIG_PATH);

  const questionWithValidation = { ...question};
  questionWithValidation.validate = makeValidate(config.userCount);

  return inquirer.prompt([questionWithValidation]);
};
