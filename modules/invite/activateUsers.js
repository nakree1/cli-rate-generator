const chalk = require('chalk');
const fs = require('fs-extra');

const generateUser = require('./generateUser');
// const askTokens = require('../../messages/askTokens');
const userSchema = require('../../utils/userSchema');
const { USER_FILE, INVITE_TOKENS_FILE } = require('../../utils/constants');

module.exports = async function () {
  try {
    const tokenData = await fs.readFile(INVITE_TOKENS_FILE, 'utf-8');
    // const { tokenData } = await askTokens();
    const tokens = tokenData.split('\n').map(token => token.trim()).filter(token => token.length !== 0);

    const users = await fs.readJson(USER_FILE);

    if (!tokens.length) {
      console.error(`Token file (${INVITE_TOKENS_FILE}) do not contain any tokens.`);
      process.exit();
    }

    console.log(tokens);

    const usersWithTokens = tokens.map((token, index) => {
      const user =  { ...users[index],  token };
      return user;
    });

    const successUsers = [];

    for (let i = 0; i < usersWithTokens.length; i++) {
      const data = await generateUser(usersWithTokens[i]);

      if (data !== null) {
        successUsers.push(userSchema(data));
      }
    }

    if (successUsers.length) {
      await fs.writeJson(USER_FILE, successUsers, { spaces: 2 });
    }

    console.log(chalk.green(`Successfully generated users: ${chalk.bold(successUsers.length)}`));

  } catch (err) {
    console.error('Failed to activate users');
    console.error(err);
    process.exit();
  }
};
