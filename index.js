#!/usr/bin/env node
const { CREATE_USER_CHOICE } = require('./utils/constants');
const welcomeMessage = require('./messages/welcomeMessage');
const askRateOrCreateUsers = require('./messages/askRateOrCreateUsers');

const ensureConfig = require('./modules/ensureConfig');
const sendInvites = require('./modules/invite/sendInvites');
const rateTopics = require('./modules/rate/rateTopics');

async function run() {
  welcomeMessage();
  const config = await ensureConfig();
  const { action } = await askRateOrCreateUsers();

  console.log(action, config);

  if (action === CREATE_USER_CHOICE) {
    await sendInvites(config);
  }

  await rateTopics(config);

}

run();
