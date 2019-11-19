const { API_URL } = require('./constants');

module.exports = {
  login: `${API_URL}/core/token/obtain/`,
  register: `${API_URL}/core/registration/`,
  sendInvite: `${API_URL}/company/customer/invite/`
}
