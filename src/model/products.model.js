const mongoose = require('mongoose');
const schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const PRODUCTOS = new schema({
  name: String,
  stock: Number,
  sold: Number,
  price: SchemaTypes.Decimal128,
  Category: { type: schema.ObjectId, ref: 'caterorys' },
});

module.exports = mongoose.model('products', PRODUCTOS);
