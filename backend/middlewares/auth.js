const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация 1');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация 2');
  }

  req.user = payload;

  return next();
};