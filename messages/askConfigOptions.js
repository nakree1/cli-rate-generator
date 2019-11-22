const chalk = require('chalk');
const inquirer = require('inquirer');
const { isEmail} = require('../modules/checker');

const questions = [
  {
    name: 'email',
    type: 'input',
    message: 'Please write an admin email:',
    validate: (input) => {
      if (!isEmail(input)) {
        return chalk.yellow('Email not valid');
      }

      return true
    }
  },
  {
    name: 'password',
    type: 'input',
    message: 'Please write an admin password:',
    validate: (input) => {
      if (input.length < 6) {
        return chalk.yellow('Password too short');
      }

      return true
    }
  },
  {
    name: 'managerId',
    type: 'number',
    message: 'Please write a manager id:',
    validate: (input) => {
      if (input <= 0) {
        return chalk.yellow('Manager id should be greater than zero');
      }

      return true
    }
  },
  {
    name: 'companyId',
    type: 'number',
    message: 'Please write a company id:',
    validate: (input) => {
      if (input <= 0) {
        return chalk.yellow('Company id should be greater than zero');
      }

      return true
    }
  },
  {
    name: 'userCount',
    type: 'number',
    message: 'Please write count of generated users:',
    validate: (input) => {
      if (input <= 0) {
        return chalk.yellow('User count should be greater than zero');
      }

      return true
    },
  },
  {
    name: 'requestLimit',
    type: 'number',
    message: 'Please write a limit of simultaneous requests:',
    validate: (input) => {
      if (input <= 0) {
        return chalk.yellow('User count should be greater than zero or equals zero');
      }

      return true
    },
  },
];

module.exports = function askConfigOptions() {
  return inquirer.prompt(questions);
};
