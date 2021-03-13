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

async function elimnarCarrito(id) {
  return await modelCarrito.findByIdAndDelete(id);
}

async function addCarritoFactura(id, comprado) {
  return await modelFactura.findByIdAndUpdate(id, { $push: { compras: comprado } }, { new: true });
}

async function listarFacturas() {
  return await modelFactura.find();
}

async function ordenarProductos() {
  return await modelProduct.find().sort({ sold: -1 }).limit(3);
}

async function orderProductosPorStock() {
  return await modelProduct.find().sort({ stock: 1 }).limit(3);
}

module.exports = {
  crearFacturaCarrito,
  buscarUserFactura,
  createFacturas,
  findProduct,
  findProductUpdate,
  elimnarCarrito,
  addCarritoFactura,
  listarFacturas,
  ordenarProductos,
  orderProductosPorStock,
};
