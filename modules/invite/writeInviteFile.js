const fs = require('fs-extra');

const sqlCommandsMessage = require('../../messages/sqlCommandsMessage');
const { USER_FILE, INVITE_SQL_FILE, INVITE_TOKENS_FILE } = require('../../utils/constants');

function getTokensCommand(arr) {
  return `select token from core_usertoken where user_id in (select user_id from core_customer where id in (${arr.join(', ')}));`;
}

function setConfirmed(arr) {
  return `update core_user set is_confirmed = true , is_active = true where id in (select user_id from core_customer where id in (${arr.join(', ')}));`;
}

module.exports = function writeInviteFile(users) {
  try {
    const idList = users.map(user => user.id);

    const commands = getTokensCommand(idList) + '\n\n' + setConfirmed(idList);

    sqlCommandsMessage(commands);

    fs.outputJsonSync(USER_FILE, users, { spaces: 2 });
    fs.outputFileSync(INVITE_SQL_FILE, commands);
    fs.outputFileSync(INVITE_TOKENS_FILE, '');

  } catch (err) {
    console.error('Failed to write invite files');
    console.error(err);
  }
};
