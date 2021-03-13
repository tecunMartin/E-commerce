const { crearFacturaCarrito, buscarUserFactura, createFacturas, findProduct, findProductUpdate } = require('../store/invoices.store');
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
          .then((facturaCreado) => {
            carritoActual.product.forEach((elemento) => {
              findProduct(elemento.productoID)
                .then((producto) => {
                  if (producto.stock < carritoActual.cantidad) {
                    console.log(producto);
                    return error(req, res, producto, 404);
                  } else {
                    findProductUpdate(producto._id, elemento.cantidad, producto.stock, producto.sold, elemento.cantidad)
                      .then(() => {})
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
        /*  console.log(facturas); */
      }
    });
  });
}

module.exports = {
  crearFactura,
};
