const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET = 'E-commerce';
const RESPONSE = require('./response');

exports.verifyAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    return RESPONSE.error(req, res, 'No tiene el TOKEN.', 404);
  }

  let token = req.headers.authorization.replace(/['"]+/g, '');
  let payload;
  try {
    payload = jwt.decode(token, SECRET);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        mensaje: 'El token ha expirado.',
      });
    }
  } catch (error) {
    return RESPONSE.error(req, res, 'El token no es valido', 404);
  }

  req.user = payload;
  next();
};
