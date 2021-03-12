const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CATEGORIAS = new schema({
  name: String,
});

module.exports = mongoose.model('caterorys', CATEGORIAS);
