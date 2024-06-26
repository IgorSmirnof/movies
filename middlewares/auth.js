const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/401-Unauthorized');
const { JWT_SECRET } = require('../utils/setup');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization is required -> Bearer'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    // console.log('success payload:', payload);
  } catch (err) {
    return next(new UnauthorizedError('Authorization is required -> token'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
