const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthorizedError('Необходима авторизация 1'));
    return;
  }

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