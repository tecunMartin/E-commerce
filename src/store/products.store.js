const model = require('../model/products.model');
const modelCategoria = require('../model/category.model');

async function findProducts() {
  return await model.find().populate('Category', 'name');
}

async function verificarElLaCaterogia(id) {
  return await modelCategoria.findById(id);
}

async function findProductID(ID) {
  return await model.findById(ID).populate('Category', 'name');
}

async function buscarProductoName(name) {
  return await model.findOne({ name: { $regex: name, $options: 'i' } }).populate('Category', 'name');
}

async function createProduct(objectProduct) {
  const newProduct = new model(objectProduct);
  return await newProduct.save();
}

async function updateProduct(id, body) {
  return await model.findByIdAndUpdate(id, body, { new: true }).populate('Category', 'name');
}

async function eliminarProduct(id) {
  return await model.findByIdAndDelete(id).populate('Category', 'name');
}

module.exports = {
  findProducts,
  findProductID,
  buscarProductoName,
  createProduct,
  updateProduct,
  eliminarProduct,
  verificarElLaCaterogia,
};
