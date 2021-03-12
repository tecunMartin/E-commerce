const mongoose = require('mongoose');
const chalk = require('chalk');
const bcrypt = require('bcrypt-nodejs');
const app = require('./app');
const modelAdmin = require('./src/model/user.model');

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
          !adminSaved ? console.log('No viene los datos de ADMIN') : console.log(chalk.black.bgBlueBright('ADMIN creado con exito.'));
        });
      });
    } else {
      return console.log(chalk.white.bgRedBright('Este usuario ya existe.'));
    }
  });
});
