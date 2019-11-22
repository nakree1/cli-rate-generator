const { API_URL } = require('./constants');

module.exports = {
  login: `${API_URL}/core/token/obtain/`,
  register: `${API_URL}/core/registration/`,
  sendInvite: `${API_URL}/company/customer/invite/`,
  getTopics: `${API_URL}/opinion/manager/{{id}}/`,
  rateTopicByManager: `${API_URL}/opinion/rate/manager/`,
  rateTopicByCompany: `${API_URL}/opinion/rate/company/`,
  sendComment: `${API_URL}/opinion/comment/`,
}
