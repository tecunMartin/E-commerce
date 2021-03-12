const model = require('../model/products.model');

async function findProducts() {
  return await model.find();
}

async function findProductID(ID) {
  return await model.findById(ID);
}

async function buscarProductoName(name) {
  return await model.findOne({ name: { $regex: name, $options: 'i' } });
}

async function createProduct(objectProduct) {
  const newProduct = new model(objectProduct);
  return await newProduct.save();
}

async function updateProduct(id, body) {
  return await model.findByIdAndUpdate(id, body, { new: true });
}

async function eliminarProduct(id) {
  return await model.findByIdAndDelete(id);
}

module.exports = {
  findProducts,
  findProductID,
  buscarProductoName,
  createProduct,
  updateProduct,
  eliminarProduct,
};
