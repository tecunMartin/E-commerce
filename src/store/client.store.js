const modelProducts = require('../model/products.model');
const modelCarrito = require('../model/carrito.model');
const modelCliente = require('../model/user.model');
const modelCategoria = require('../model/category.model');
const categoryModel = require('../model/category.model');

async function obtenerCarritoCompleto(user) {
  return await modelCarrito.findOne({ user });
}

async function findProduct(id) {
  return await modelProducts.findById(id);
}

async function findCarrito(id) {
  return await modelCarrito.findOne({ user: id });
}

async function crearCarrito(objCarrito) {
  const newCarrito = new modelCarrito(objCarrito);
  return await newCarrito.save();
}

async function addProductCart(user, producto) {
  return await modelCarrito.findOneAndUpdate({ user }, { $push: { product: producto } }, { new: true });
}

async function sumadeSubtotal(id, resultado) {
  return await modelCarrito.findByIdAndUpdate(id, { $set: { total: resultado } }, { new: true });
}

async function editarMe(id, body) {
  return await modelCliente.findOneAndUpdate({ _id: id, rol: 'ROL_CLIENTE' }, body, { new: true });
}

async function eliminarme(id) {
  return await modelCliente.findByIdAndDelete(id);
}

async function buscarPorName(nameFind) {
  return await modelProducts.aggregate([
    {
      $unwind: '$name',
    },
    {
      $match: { name: { $regex: nameFind, $options: 'i' } },
    },
    {
      $group: {
        _id: '$_id',
        titulo: { $first: '$name' },
        stock: { $first: '$stock' },
        price: { $first: '$price' },
      },
    },
  ]);
}

async function buscarPorNameCategoria(id) {
  return await modelProducts.find({ Category: id });
}

async function findCategory(name) {
  return await categoryModel.findOne({ name });
}

async function ordenarProductos() {
  return await modelProducts.find().sort({ sold: -1 }).limit(3);
}

module.exports = {
  ordenarProductos,
  findProduct,
  findCarrito,
  crearCarrito,
  addProductCart,
  sumadeSubtotal,
  editarMe,
  obtenerCarritoCompleto,
  eliminarme,
  buscarPorName,
  buscarPorNameCategoria,
  findCategory,
};
