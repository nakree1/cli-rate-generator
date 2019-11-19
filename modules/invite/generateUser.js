const axios = require('axios');

const routes = require('../../utils/routes');
const { DEFAULT_PASSWORD } = require('../../utils/constants');

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

    await axios.post(routes.register, body);

    return { email, password: body.password, id };
  } catch(err) {
    console.log(err);
    return null
  }
};
