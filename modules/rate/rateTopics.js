const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs-extra');

const askConfirm = require('../../messages/askConfirm');
const generateInvite = require('./generateInvite');
const writeInviteFile = require('./writeInviteFile');
const activateUsers = require('./activateUsers');

const routes = require('../../utils/routes');
const { USER_FILE } = require('../../utils/constants');
const { isUserFileValid } = require('../checker');

module.exports = async function(config) {
  const { manager: { id: managerId }} = config;

  if (!isUserFileValid) {
    console.log(chalk.red(`Users file (${USER_FILE}) is not valid or does not exist`));
    process.exit();
  }

  try {
    const users = fs.readJsonSync(USER_FILE);




    const customers = [];

    for (let i = 0; i < userCount; i++) {
      const user = await generateInvite({ instance, managerId });

      if (user !== null) {
        customers.push(user);
      }
    }

    await writeInviteFile(customers);

    const { isConfirmed } = await askConfirm();

    if (!isConfirmed) {
      process.exit();
    }

    await activateUsers();
  } catch (err) {
    console.error('Admin authorization failed.');
    console.error(err);
    return;
  }
};
