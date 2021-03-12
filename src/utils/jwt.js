const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET = 'E-commerce';

exports.createToken = function (users) {
  let payload = {
    sub: users._id,
    userName: users.userName,
    rol: users.rol,
    iat: moment().unix(),
    exp: moment().day(10, 'days').unix(),
  };
  return jwt.encode(payload, SECRET);
};
