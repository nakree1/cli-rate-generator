#!/usr/bin/env node
const { CREATE_USER_CHOICE } = require('./utils/constants');
const welcomeMessage = require('./messages/welcomeMessage');
const configMessage = require('./messages/configMessage');
const askRateOrCreateUsers = require('./messages/askRateOrCreateUsers');

const ensureConfig = require('./modules/ensureConfig');
const sendInvites = require('./modules/invite/sendInvites');
const rateTopics = require('./modules/rate/rateTopics');

async function run() {
  try {
    welcomeMessage();
    const config = await ensureConfig();
    configMessage(config);

    const { action } = await askRateOrCreateUsers();

    if (action === CREATE_USER_CHOICE) {
      await sendInvites(config);
    }

    await rateTopics(config);
  } catch (err) {

  }
}

run();
