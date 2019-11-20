module.exports = function(user) {
  const { firstName = '', lastName = '', email = '', password = '', id = '', token = '' } = user;

  return {
    id,
    token,
    firstName,
    lastName,
    email,
    password,
  }
};
