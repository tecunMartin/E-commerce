const {
  findCarrito,
  findProduct,
  crearCarrito,
  addProductCart,
  sumadeSubtotal,
  editarMe,
  eliminarme,
  obtenerCarritoCompleto,
  buscarPorName,
  buscarPorNameCategoria,
  findCategory,
  ordenarProductos,
} = require('../store/client.store');
const { success, error } = require('../utils/response');

function BreakException(req, res, message) {
  this.message = message;
  this.name = 'Exception';
  return error(req, res, 'Este producto ya existe en el carrito.', 404);
}

/* Mostrar carrito de compras */
function obtenerCarrito(req, res) {
  obtenerCarritoCompleto(req.user.sub)
    .then((allCarrito) => {
      allCarrito ? success(req, res, allCarrito, 200) : error(req, res, 'No se puede visualizar el carrito.', 500);
    })
    .catch((err) => {
      console.log(err);
      error(req, res, 'Error interno.', 500);
    });
}

/* Agregar productos al carrito */
function agregarCarrito(req, res) {
  if (req.user.rol === 'ROL_ADMIN') return error(req, res, 'No tiene los permisos.', 401);
  const { product, cantidad } = req.body;

  findCarrito(req.user.sub)
    .then((carritoEncontrado) => {
      if (carritoEncontrado) {
        carritoEncontrado.product.forEach((elemento) => {
          if (elemento.productoID == product) {
            throw new BreakException(req, res, 'Ya existe.');
          }
        });

        findProduct(product).then((producto) => {
          if (producto.stock < cantidad) {
            return error(req, res, 'No tenemos esa cantidad de productos en existencia.', 500);
          } else {
            const products = producto._id;
            let carrito = {
              product: [{ productoID: products, cantidad, subtotal: cantidad * producto.price.bytes }],
            };

            addProductCart(req.user.sub, carrito.product)
              .then((carritoActualizado) => {
                if (carritoActualizado) {
                  let total = 0;
                  carritoActualizado.product.map((carritoSuma) => {
                    total += parseFloat(carritoSuma.subtotal.bytes);
                  });
                  sumadeSubtotal(carritoActualizado._id, total)
                    .then((carritoFinal) => {
                      carritoFinal ? success(req, res, { carrito: carritoFinal }, 200) : error(req, res, 'No se puede actualizar.', 500);
                    })
                    .catch((err) => {
                      console.log(err);
                      return error(req, res, 'Error interno', 404);
                    });
                } else {
                  return error(req, res, 'No se puede actializar el carrito.', 500);
                }
              })
              .catch((err) => {
                console.log(err);
                return error(req, res, 'Error interno', 404);
              });
          }
        });
      } else {
        findProduct(product).then((producto) => {
          if (producto.stock < cantidad) {
            return error(req, res, 'No tenemos esa cantidad de productos en existencia.', 500);
          } else {
            const user = req.user.sub;
            const products = producto._id;
            const carrito = {
              user,
              product: [{ productoID: products, cantidad, subtotal: cantidad * producto.price.bytes }],
              total: 0,
            };

            carrito.product.map((elemento) => {
              carrito.total = carrito.total + elemento.subtotal;
            });

            crearCarrito(carrito)
              .then((carritoCreado) => {
                carritoCreado ? success(req, res, { carritoCreado }, 200) : error(req, res, 'No se pudo crear el carrito.', 500);
              })
              .catch((err) => {
                console.log(err);
                return error(req, res, 'Error Interno', 404);
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error Interno', 500);
    });
}

/* Editar Cuenta propia */
function editarCliente(req, res) {
  if (req.user.rol === 'ROL_ADMIN') return error(req, res, 'No tiene los permisos.', 401);

  const editBody = req.body;
  delete editBody.password;
  delete editBody.rol;
  if (editBody.userName) {
    editarMe(req.user.sub, editBody)
      .then((clienteModificado) => {
        clienteModificado ? success(req, res, clienteModificado, 200) : error(req, res, 'No se puede modificar el usuario.', 500);
      })
      .catch((err) => {
        console.log(err);
        return error(req, res, 'Error Interno', 500);
      });
  } else {
    return error(req, res, 'Faltan campos.', 404);
  }
}

/* Eliminar Cuenta Popia  */
function eliminarCliente(req, res) {
  if (req.user.rol === 'ROL_ADMIN') return error(req, res, 'No tiene los permisos.', 401);

  eliminarme(req.user.sub)
    .then((usuarioEliminar) => {
      usuarioEliminar ? success(req, res, 'Cuenta eliminada con exito.', 200) : error(req, res, 'No se puede eliminar el usuario.', 500);
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error interno', 500);
    });
}

/* Busque de producto por nombre */
function obtenerUnProductoPorNombre(req, res) {
  let { name } = req.body;
  /* Para buscar por nombre */

  buscarPorName(name)
    .then((productFind) => {
      !productFind ? error(req, res, 'Error al obtener los PRODUCTOS.') : success(req, res, productFind, 200);
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error interno', 500);
    });
}

/* Buscar categorias por nombre */
function obtenerUnaCategoriaPorNombre(req, res) {
  let { name } = req.body;

  findCategory(name)
    .then((categoriaEncontrada) => {
      buscarPorNameCategoria(String(categoriaEncontrada._id))
        .then((productFind) => {
          if (productFind.length === 0) {
            return error(req, res, 'No hay ninguna Coincidencia.', 404);
          } else {
            const viewProduct = {
              Category: categoriaEncontrada.name,
              Products: [],
            };
            productFind.forEach((elemento) => {
              viewProduct.Products.push(elemento.name);
            });

            !productFind ? error(req, res, 'Error al obtener los PRODUCTOS.') : success(req, res, viewProduct, 200);
          }
        })
        .catch((err) => {
          console.log(err);
          return error(req, res, 'Error interno', 500);
        });
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error interno', 500);
    });
}

/* Catalogo de más vendidos */
function masVendidos(req, res) {
  ordenarProductos()
    .then((vendidos) => {
      vendidos ? success(req, res, vendidos, 200) : error(req, res, 'No hay vendidos', 500);
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error interno', 500);
    });
}

module.exports = {
  agregarCarrito,
  editarCliente,
  eliminarCliente,
  obtenerCarrito,
  obtenerUnProductoPorNombre,
  obtenerUnaCategoriaPorNombre,
  masVendidos,
};
