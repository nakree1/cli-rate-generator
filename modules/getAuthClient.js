const axios = require('axios');

const routes = require('../../utils/routes');

module.exports = async function({ email, password }) {
  try {
    const tokens = await axios.post(routes.login, { email, password }).then(res => res.data);

    const instance = axios.create({
      headers: {
        'Authorization': `Bearer ${tokens.access}`
      }
    });

    return instance;
  } catch(err) {
    console.log(`Authorization ${email} ${password} failed.`);
    return axios;
  }
}
