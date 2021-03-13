const model = require('../model/category.model');
const modelProduct = require('../model/products.model');

async function findCategorias() {
  return await model.find();
}

async function findProductoPorCategoria(id) {
  return await modelProduct.find({ Category: id });
}

async function createCategoria(body) {
  const newCategory = new model(body);
  return await newCategory.save();
}

async function updateCategoria(id, body) {
  return await model.findByIdAndUpdate(id, body, { new: true });
}

async function findOneCategoria(name) {
  return await model.findOne({ name });
}

async function removeCategory(id) {
  return await model.findByIdAndDelete(id);
}

async function updateCategoryDefault(id, defaultCategory) {
  return await modelProduct.findByIdAndUpdate({ _id: id }, { $set: { Category: defaultCategory } }, { new: true });
}

module.exports = {
  findCategorias,
  createCategoria,
  updateCategoria,
  findProductoPorCategoria,
  findOneCategoria,
  removeCategory,
  updateCategoryDefault,
};
