const getAuthClient = require('../getAuthClient');
const displayError = require('../../utils/displayError');

const { getTopics } = require('../../utils/routes');

module.exports = async function({ user, managerId }) {
  const { email, password } = user;
  const client = await getAuthClient({ email, password });

  try {
    const subjects = await client.get(getTopics.replace('{{id}}', managerId)).then(res => res.data);

    const topics = subjects.reduce((acc, subject) => [...acc, ...subject.topics] , []);

    return topics
  } catch (err) {
    displayError(err, 'Failed to fetch topic list');

    return []
  }
};
