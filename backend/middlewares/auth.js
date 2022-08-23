const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  const { Authorization } = req.headers;

  if (!Authorization || !Authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(`Необходима авторизация 1 ${Authorization}`));
    return;
  }

  const token = Authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация 2');
  }

  req.user = payload;

  next();
};