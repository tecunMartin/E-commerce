const mongoose = require('mongoose');
const chalk = require('chalk');
const bcrypt = require('bcrypt-nodejs');
const app = require('./app');
const modelAdmin = require('./src/model/user.model');
const modelCategory = require('./src/model/category.model');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/e-commerce', { useNewUrlParser: true, useUnifiedTopology: true }).then((conected) => {
  const PORT = 3000;
  app.listen(PORT, () => console.log(chalk.bgGreenBright.black(`Listen http://localhost:${PORT}`)));

  modelAdmin.find({ userName: 'ADMIN' }, (err, adminFind) => {
    if (err) return console.log('Error a la hora de encontrear el ADMIN.');

    if (adminFind.length === 0) {
      const ADMIN = {
        userName: 'ADMIN',
        rol: 'ROL_ADMIN',
      };
      bcrypt.hash('123456', null, null, (err, passEncript) => {
        ADMIN.password = passEncript;

        const newAdmin = new modelAdmin(ADMIN);
        newAdmin.save((err, adminSaved) => {
          if (err) return console.log('Error a la hora de guardar el ADMIN.');
          if (!adminSaved) {
            return console.log('No viene los datos de ADMIN');
          } else {
            console.log(chalk.black.bgBlueBright('ADMIN creado con exito.'));
            CategoryDefault();
          }
        });
      });
    } else {
      console.log(chalk.white.bgRedBright('Este ADMIN ya existe.'));
      CategoryDefault();
    }
  });

  /* Creado de categoria por defecto */
  function CategoryDefault() {
    modelCategory.find({ name: 'DEFAULT' }, (err, categoryFind) => {
      if (err) return console.log('Error en al busqueda');

      if (categoryFind.length === 0) {
        const categoria = {
          name: 'DEFAULT',
        };

        const newCategoria = new modelCategory(categoria);
        newCategoria.save((err, categoriaGuardada) => {
          if (err) return console.log('Error a la hora de guardar la CATEGORY.');
          if (!categoriaGuardada) {
            return console.log('No viene los datos de CATEGORY.');
          } else {
            return console.log(chalk.bgBlueBright.black('CATEGORY creado con exito.'));
          }
        });
      } else {
        return console.log(chalk.white.bgRedBright('Esta CATEGORY creada ya existe.'));
      }
    });
  }
});
