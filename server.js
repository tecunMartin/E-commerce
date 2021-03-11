const mongoose = require('mongoose');
const app = require('./app');
const chalk = require('chalk');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/e-commerce', { useNewUrlParser: true, useUnifiedTopology: true }).then((conected) => {
  const PORT = 3000;
  app.listen(PORT, () => console.log(chalk.bgGreenBright.black(`Listen http://localhost:${PORT}`)));
});
