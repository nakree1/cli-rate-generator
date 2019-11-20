const chalk = require('chalk');
const fs = require('fs-extra');

const { CONFIG_PATH } = require('../utils/constants');
const { isConfigExist, isConfigValid } = require('./checker');

const askConfigOptions = require('../messages/askConfigOptions');

module.exports = async function ensureConfig() {
  let errorFlag = false;

  if (!isConfigExist()) {
    console.log(chalk.redBright('Config file not found.'));
    errorFlag = true;
  } else if (!isConfigValid()) {
    console.log(chalk.redBright('Config file not valid.'));
    errorFlag = true;
  }


  if (errorFlag) {
    console.log(chalk.green.bold('Generating a new config file...'));
    const { email, password, managerId, userCount, requestLimit } = await askConfigOptions();

    const config = {
      admin: {
        email, password
      },
      manager: {
        id: managerId
      },
      userCount,
      requestLimit
    };

    await fs.outputJson(CONFIG_PATH, config, { spaces: 2 }).catch(err => console.error(err));


    console.log(chalk.green.bold('Generation completed!'));
  }

  return await fs.readJson(CONFIG_PATH);
};
