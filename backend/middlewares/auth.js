const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация 2');
  }

  req.user = payload;

  next();
};