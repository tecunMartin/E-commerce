const models = require('../model/user.model');

async function findUser(userName) {
  return await models.findOne({ userName });
}

async function createUser(user) {
  const newUser = new models(user);
  return await newUser.save();
}

module.exports = {
  findUser,
  createUser,
};
