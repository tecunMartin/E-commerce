const mongoose = require('mongoose');
const schema = mongoose.Schema;

const USUARIOS = new schema({
  userName: String,
  password: String,
  rol: String,
});

module.exports = mongoose.model('users', USUARIOS);
