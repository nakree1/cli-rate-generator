const inquirer = require('inquirer');

const questions = [
  {
    name: 'isConfirmed',
    type: 'confirm',
    message: 'Proceed?',
    default: true
  }
];

module.exports = function askConfirm() {
  return inquirer.prompt(questions);
};
