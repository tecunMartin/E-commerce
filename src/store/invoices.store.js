const modelFactura = require('../model/invoices.model');
const modelCarrito = require('../model/carrito.model');
const modelProduct = require('../model/products.model');

async function crearFacturaCarrito(user) {
  return await modelCarrito.findOne({ user });
}

async function buscarUserFactura(id) {
  return await modelFactura.findOne({ user: id });
}

async function createFacturas(objFactura) {
  const newFactura = new modelFactura(objFactura);
  return await newFactura.save();
}

async function findProduct(id) {
  return await modelProduct.findById(id);
}

async function findProductUpdate(id, cantidadCarrito, cantidadStok, soldViejo, soldNuevo) {
  return await modelProduct.findByIdAndUpdate(id, { stock: cantidadStok - cantidadCarrito, sold: soldViejo + soldNuevo }, { new: true });
}

module.exports = {
  crearFacturaCarrito,
  buscarUserFactura,
  createFacturas,
  findProduct,
  findProductUpdate,
};
