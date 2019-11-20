const askConfirm = require('../../messages/askConfirm');
const getAuthClient = require('../getAuthClient');
const generateInvite = require('./generateInvite');
const writeInviteFile = require('./writeInviteFile');
const activateUsers = require('./activateUsers');
const userSchema = require('../../utils/userSchema');

module.exports = async function sendInvites(config) {
  const { admin: { email, password }, manager: { id: managerId }, userCount } = config;

  try {
    const instance = await getAuthClient({ email, password });

    const customers = [];

    for (let i = 0; i < userCount; i++) {
      const user = await generateInvite({ instance, managerId });

      if (user !== null) {
        customers.push(userSchema(user));
      }
    }

    await writeInviteFile(customers);

    const { isConfirmed } = await askConfirm();

    if (!isConfirmed) {
      process.exit();
    }

    await activateUsers();
  } catch (err) {
    console.error(err);
    return;
  }
};
