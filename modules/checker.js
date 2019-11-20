const fs = require("fs-extra");
const isEmail = require("validator/lib/isEmail");
const isEmpty = require("validator/lib/isEmpty");
const isInt = require("validator/lib/isInt");

const { CONFIG_PATH, USER_FILE } = require('../utils/constants');

function isConfigExist() {
  try {
    return fs.pathExistsSync(CONFIG_PATH)
  } catch (err) {
    console.log(err);
    return false
  }
}

function isConfigValid() {
  try {
    const config = fs.readJsonSync(CONFIG_PATH);

    const { admin, manager, userCount, requestLimit } = config;

    const validation = [
      () => isEmail(admin.email),
      () => !isEmpty(admin.password),
      () => isInt(String(manager.id)) && String(manager.id) > 0,
      () => isInt(String(userCount)) && String(userCount) > 0,
      () => isInt(String(requestLimit)) && String(requestLimit) >= 0,
    ];

    return validation.every(func => func());
  } catch (err) {
    console.error(err);
    return false
  }
}

function isUserFileValid() {
  try {
    const users = fs.readJsonSync(USER_FILE);

    if (users.length === 0) {
      return false
    }

    const validation = [
      (user) => isEmail(user.email),
      (user) => !isEmpty(user.password),
      (user) => isInt(String(user.id)) && String(user.id) > 0,
    ];

    return users.every(user => validation.every(func => func(user)));
  } catch (err) {
    console.log(err);
    return false
  }
}

module.exports = {
  isUserFileValid,
  isConfigExist,
  isConfigValid,
  isEmail,
  isInt,
};
