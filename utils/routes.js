const { API_URL } = require('./constants');

module.exports = {
  login: `${API_URL}/core/token/obtain/`,
  register: `${API_URL}/core/registration/`,
  sendInvite: `${API_URL}/company/customer/invite/`,
  getTopics: `${API_URL}/opinion/manager/{{id}}/`,
  rateTopic: `${API_URL}/opinion/rate/manager/`,
  sendComment: `${API_URL}/opinion/comment/`,
}
