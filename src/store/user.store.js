const model = require('../model/user.model');

async function listarUsuario(q) {
  return await model.find();
}

async function crearUsuario(objectuser) {
  const newUser = new model(objectuser);
  return await newUser.save();
}

async function findUserID(id) {
  return await model.findById(id);
}

async function findUser(name) {
  return await model.findOne({ userName: { $regex: name, $options: 'i' } });
}

async function updateRol(id, rol) {
  return await model.findByIdAndUpdate(id, { rol }, { new: true });
}

async function updateUser(id, body) {
  return await model.findByIdAndUpdate(id, body, { new: true });
}

async function eliminarUser(id) {
  return await model.findByIdAndDelete(id);
}

module.exports = {
  listarUsuario,
  crearUsuario,
  findUser,
  updateRol,
  updateUser,
  eliminarUser,
  findUserID,
};
