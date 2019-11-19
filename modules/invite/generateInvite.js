const faker = require('faker');

const routes = require('../../utils/routes');

module.exports = async function generateInvite({ instance, managerId }) {
  try {
    const email = faker.internet.email();
    const firstName =  faker.name.firstName();
    const lastName =  faker.name.lastName();

    const body = {
      userData: {
        email,
        firstName,
        lastName
      },
      manager: managerId
    }

    const { id } = await instance.post(routes.sendInvite, body).then(res => res.data);

    return { id, email, firstName, lastName }
  } catch(err) {
    console.log(err);
    return null
  }
};
