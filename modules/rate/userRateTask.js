const faker = require('faker');
const getAuthClient = require('../getAuthClient');
const { rateTopicByManager, rateTopicByCompany, sendComment } = require('../../utils/routes');
const displayError = require('../../utils/displayError');
const minMaxRandom = require('../../utils/minMaxRandom');

function rateTopicTask({ instance, topicId, managerId, companyId, customerId }) {
  const body = {
    topic: topicId,
    customer: customerId,
    manager: companyId ? undefined : managerId,
    company: companyId ? companyId : undefined,
    isRecommended: minMaxRandom(1, 4),
    satisfaction: minMaxRandom(1, 10),
    importance: minMaxRandom(1, 10)
  };

  return instance.post(companyId ? rateTopicByCompany : rateTopicByManager , body)
    .then(res => res.data.id)
    .catch(err => displayError(err));
}

function commentTask({ instance, opinions, customerId }) {
  const body = {
    opinions,
    customer: customerId,
    expectActionProvider: false,
    statusSharedComment: 1,
    text: faker.hacker.phrase()
  };

  return instance.post(sendComment, body).catch(err => displayError(err));
}

module.exports = async function ({ user, managerId, companyId, topicChunks, progress }) {
  try {
    const { id, email, password } = user;
    const { current, update } = progress;

    const client = await getAuthClient({ email, password });

    let opinionsCount = 0;

    for (let i = 0; i < topicChunks.length; i++) {
      const idList = await Promise.all(
        topicChunks[i].map(topic => rateTopicTask({
          instance: client,
          topicId: topic.id,
          customerId: id,
          managerId,
          companyId
        }))
      ).catch(_ => {
        return []
      });

      if (idList.length) {
        await commentTask({ instance: client, customerId: id, opinions: idList });
      }

      opinionsCount = opinionsCount + idList.length;
      update(opinionsCount + current);
    }

    return opinionsCount;
  } catch (err) {
    displayError(err);
    return 0;
  }
};
