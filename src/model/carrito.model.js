const mongoose = require('mongoose');
const schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const CARRITO = schema({
  user: { type: schema.ObjectId, ref: 'users' },
  product: [
    {
      productoID: { type: schema.ObjectId, ref: 'products' },
      cantidad: Number,
      subtotal: { type: SchemaTypes.Decimal128, get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)) },
    },
  ],
  total: { type: SchemaTypes.Decimal128, get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)) },
});

module.exports = mongoose.model('carts', CARRITO);
