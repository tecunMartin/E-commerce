const models = require('../model/user.model');

async function findWithEmail(model, user) {
  return await model.findOne({ user });
}

async function findUser(user) {
  return await models.findOne({ user });
}

async function createUser(user) {
  const newUser = new models(user);
  return await newUser.save();
}

module.exports = {
  findWithEmail,
  findUser,
  createUser,
};
