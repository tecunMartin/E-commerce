const bcrypt = require('bcrypt-nodejs');
const { error, success } = require('../utils/response');
const {
  crearUsuario: create,
  findUser,
  listarUsuario: listar,
  updateRol,
  updateUser,
  eliminarUser,
  findUserID,
} = require('../store/user.store');

function listarUsuario(req, res) {
  listar()
    .then((usuariosEncontrados) => {
      if (usuariosEncontrados.length === 0) {
        return success(req, res, 'No hay usuarios todavia.', 200);
      } else {
        return success(req, res, { usuariosEncontrados }, 200);
      }
    })
    .catch((err) => {
      console.log(err);
      return error(req, res, 'Error Interno', 500);
    });
}

/* Crear un usuario */
function crearUsuario(req, res) {
  if (req.user.rol === 'ROL_CLIENTE') return error(req, res, 'No tienes permisos para crear usuario', 401);

  const { userName, password, rol } = req.body;

  if (userName && password) {
    findUser(userName)
      .then((userEncontrado) => {
        if (userEncontrado) {
          return error(req, res, 'Este usuario ya existe.', 404);
        } else {
          const user = {
            userName,
            rol,
          };
          bcrypt.hash(password, null, null, (err, passEncript) => {
            user.password = passEncript;
            create(user).then((userCreado) => {
              userCreado ? success(req, res, userCreado, 200) : error(req, res, 'No se puede crear usuario.');
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return error(req, res, 'Error Interno', 500);
      });
  } else {
    return error(req, res, 'Hacen falta campos.', 404);
  }
}

/* Modificios ROL */
function modificarUsuarioROL(req, res) {
  if (req.user.rol === 'ROL_CLIENTE') return error(req, res, 'No tienes permisos para crear usuario', 401);

  const { rol } = req.body;

  if (rol) {
    if (rol === 'ROL_ADMIN' || rol === 'ROL_CLIENTE') {
      const { idUser } = req.params;

      updateRol(idUser, rol)
        .then((rolModificado) => {
          rolModificado ? success(req, res, rolModificado, 200) : error(req, res, 'No se puede modificar este rol.', 500);
        })
        .catch((err) => {
          console.log(err);
          return error(req, res, 'Error Interno', 500);
        });
    } else {
      return error(req, res, 'El rol que ingreso no existe.', 404);
    }
  } else {
    return error(req, res, 'No vienen los campos necesarios.', 404);
  }
}

/* Modificar USUARIO */
function modificarUsuario(req, res) {
  if (req.user.rol === 'ROL_CLIENTE') return error(req, res, 'No tienes permisos para crear usuario', 401);

  const userBody = req.body;
  delete userBody.rol;
  delete userBody.password;

  if (userBody.userName) {
    const { idUser } = req.params;

    findUserID(idUser)
      .then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          if (usuarioEncontrado.rol === 'ROL_CLIENTE') {
            updateUser(idUser, userBody)
              .then((usuarioModificado) => {
                usuarioModificado
                  ? success(req, res, { usuarioModificado }, 200)
                  : error(req, res, 'No se puede modificar el producto.', 500);
              })
              .catch((err) => {
                console.log(err);
                return error(req, res, 'Error Interno', 500);
              });
          } else {
            return error(req, res, 'No puedes modificar a un ADMIN.', 404);
          }
        } else {
          return error(req, res, 'Usuario No existente.', 404);
        }
      })
      .catch((err) => {
        console.log(err);
        return error(req, res, 'Error Interno', 500);
      });
  } else {
    return error(req, res, 'No vienen los campos necesarios.', 404);
  }
}

/* Eliminar USUARIO */
function eliminarUsuario(req, res) {
  if (req.user.rol === 'ROL_CLIENTE') return error(req, res, 'No tienes permisos para crear usuario', 401);
  const { idUser } = req.params;

  findUserID(idUser).then((usuarioEncontrado) => {
    if (usuarioEncontrado) {
      if (usuarioEncontrado.rol === 'ROL_CLIENTE') {
        eliminarUser(idUser)
          .then((usuarioEliminado) => {
            if (usuarioEliminado) {
              return success(req, res, 'Usuario Eliminado con Exito!!!', 200);
            } else {
              return error(req, res, 'Este usuario no existe.');
            }
          })
          .catch((err) => {
            console.log(err);
            return error(req, res, 'Error Interno', 500);
          });
      } else {
        return error(req, res, 'No puedes eliminar a un ADMIN.', 404);
      }
    } else {
      return error(req, res, 'Este usuario no existe.', 500);
    }
  });
}

module.exports = {
  crearUsuario,
  modificarUsuario,
  listarUsuario,
  modificarUsuarioROL,
  eliminarUsuario,
};
