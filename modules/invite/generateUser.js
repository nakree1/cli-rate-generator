const axios = require('axios');

const routes = require('../../utils/routes');
const { DEFAULT_PASSWORD } = require('../../utils/constants');
const displayError = require('../../utils/displayError');

module.exports = async function(user) {
  try {
    const { email, firstName, lastName, token, id } = user;
    const body = {
      email,
      firstName,
      lastName,
      token,
      password: DEFAULT_PASSWORD,
      processPersonalData: true
    };

    console.log(body);

    await axios.post(routes.register, body);

    return { id, token, email, firstName, lastName, password: body.password };
  } catch(err) {
    displayError(err);

    return null
  }
};
