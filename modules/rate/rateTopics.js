const performance = require('perf_hooks').performance;
const chalk = require('chalk');
const fs = require('fs-extra');

const { ProgressBar } = require('../ProgressBar');
const chunkSplit = require('../../utils/chunkSplit');
const displayError = require('../../utils/displayError');
const getTopicList = require('./getTopicList');
const userRateTask = require('./userRateTask');

const { USER_FILE } = require('../../utils/constants');
const { isUserFileValid } = require('../checker');

module.exports = async function (config) {
  const { manager: { id: managerId }, requestLimit } = config;

  if (!isUserFileValid) {
    console.log(chalk.red(`Users file (${USER_FILE}) is not valid or does not exist`));
    process.exit();
  }

  try {
    const t0 = performance.now();
    const users = fs.readJsonSync(USER_FILE);

    console.log(chalk.green(`Fetching topic list...`));
    const topicList = await getTopicList({ user: users[0], managerId });

    if (topicList.length === 0) {
      console.log(chalk.red(`Topic list is empty`));
      process.exit();
    }

    const topicChunks = chunkSplit(topicList, requestLimit);

    const Progress = new ProgressBar('Creating opinions', topicList.length * users.length);

    Progress.draw(0);

    let opinionsCount = 0;

    for (let i = 0; i < users.length; i++) {
      const count = await userRateTask(
        {
          user: users[i],
          managerId,
          topicChunks,
          progress: { current: opinionsCount, update: Progress.draw }
        });

      opinionsCount = opinionsCount + count;
    }

    Progress.draw(opinionsCount);
    Progress.finish();

    const t1 = performance.now();
    const time = ((t1 - t0) / 1000).toFixed(1);

    console.log(
      chalk.green(`${chalk.bold('Success')}: Created ${chalk.bold(opinionsCount)} opinions for ${chalk.bold(users.length)} users by ${chalk.bold(time + 's')}`)
    );
  } catch (err) {
    displayError(err);
  }
};
