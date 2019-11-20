const chalk = require('chalk');

module.exports = function configMessage(config) {
  const { admin, manager, requestLimit, userCount } = config;
  console.log(
    chalk.green.bold('Received config:')
  );

  console.log(
    chalk.green(
      ` Admin: ${chalk.cyan.bold(admin.email)}\n Manager ID: ${chalk.cyan.bold(manager.id)}\n Request Limit: ${chalk.cyan.bold(requestLimit)}\n User Count For Generation: ${chalk.cyan.bold(userCount)}`
    )
  );
};
