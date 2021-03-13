const {
  crearFacturaCarrito,
  elimnarCarrito,
  buscarUserFactura,
  createFacturas,
  findProduct,
  findProductUpdate,
  addCarritoFactura,
  listarFacturas,
  ordenarProductos,
  orderProductosPorStock,
} = require('../store/invoices.store');
const { success, error } = require('../utils/response');

function crearFactura(req, res) {
  crearFacturaCarrito(req.user.sub).then((carritoActual) => {
    buscarUserFactura(req.user.sub).then((facturas) => {
      if (!facturas) {
        const factura = {
          user: carritoActual.user,
          compras: [carritoActual],
        };

        createFacturas(factura)
          .then(() => {
            carritoActual.product.forEach((elemento) => {
              findProduct(elemento.productoID)
                .then((producto) => {
                  if (producto.stock < elemento.cantidad) {
                    return error(req, res, 'Ya no hay producto disponible.', 404);
                  } else {
                    findProductUpdate(producto._id, elemento.cantidad, producto.stock, producto.sold, elemento.cantidad)
                      .then(() => {
                        elimnarCarrito(carritoActual._id)
                          .then((carritoEliminado) => {
                            carritoEliminado ? success(req, res, factura, 200) : error(req, res, 'Error para eliminar el carrito', 5000);
                          })
                          .catch((err) => {
                            console.log(err);
                            return error(req, res, 'Error Interno', 500);
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                        return error(req, res, 'Error Interno', 500);
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  return error(req, res, 'Error Interno', 500);
                });
            });
          })
          .catch((err) => {
            console.log(err);
            return error(req, res, 'Error Interno', 500);
          });
      } else {
        if (!carritoActual) {
          return success(req, res, 'Llena tu carrito de compras en: http://localhost:3000/client/carrito/agregar', 200);
        } else {
          const factura = {
            compras: [carritoActual],
          };

          addCarritoFactura(facturas._id, factura.compras)
            .then((carritoAgregado) => {
              carritoActual.product.forEach((elemento) => {
                findProduct(elemento.productoID)
                  .then((producto) => {
                    if (producto.stock < elemento.cantidad) {
                      return error(req, res, 'Ya no hay producto disponible.', 404);
                    } else {
                      findProductUpdate(producto._id, elemento.cantidad, producto.stock, producto.sold, elemento.cantidad)
                        .then(() => {
                          elimnarCarrito(carritoActual._id)
                            .then((carritoEliminado) => {
                              carritoEliminado ? success(req, res, factura, 200) : error(req, res, 'Error para eliminar el carrito', 5000);
                            })
                            .catch((err) => {
                              console.log(err);
                              return error(req, res, 'Error Interno', 500);
                            });
                        })
                        .catch((err) => {
                          console.log(err);
                          return error(req, res, 'Error Interno', 500);
                        });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    return error(req, res, 'Error Interno', 500);
                  });
              });
            })
            .catch((err) => {
              console.log(err);
              return error(req, res, 'Error Interno', 500);
            });
        }
      }
    });
  });
}

function visualizarFacturas(req, res) {
  if (req.user.rol === 'ROL_CLIENTE') return error(req, res, 'No tienes permisos.', 401);

  listarFacturas()
    .then((facturasEncontradas) => {
      if (facturasEncontradas) {
        if (facturasEncontradas.length === 0) {
          return success(req, res, 'No hay facturas aun.', 200);
        } else {
          return success(req, res, facturasEncontradas, 200);
        }
      } else {
        return error(req, res, 'No se encuetran facturas', 500);
      }
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error Interno', 500);
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

/* Categoria que hacer falta */
function faltantes(req, res) {
  orderProductosPorStock()
    .then((vendidos) => {
      vendidos ? success(req, res, vendidos, 200) : error(req, res, 'No hay vendidos', 500);
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error interno', 500);
    });
}

module.exports = {
  crearFactura,
  visualizarFacturas,
  masVendidos,
  faltantes,
};
