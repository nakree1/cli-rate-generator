const chalk = require('chalk');
const inquirer = require('inquirer');
const { CREATE_USER_CHOICE, RATE_TOPICS_CHOICE } = require('../utils/constants');

const questions = [
  {
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      { name: 'Create new users', value: CREATE_USER_CHOICE },
      { name: 'Rate topics using saved users', value: RATE_TOPICS_CHOICE }
    ],
    default: RATE_TOPICS_CHOICE
  }
];

module.exports = function askRateOrCreateUsers() {
  return inquirer.prompt(questions);
};
