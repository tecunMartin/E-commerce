const mongoose = require('mongoose');
const schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const PRODUCTOS = new schema({
  name: String,
  stock: Number,
  sold: Number,
  price: { type: SchemaTypes.Decimal128, get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)) },
  Category: { type: schema.ObjectId, ref: 'caterorys' },
});

module.exports = mongoose.model('products', PRODUCTOS);
