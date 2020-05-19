const jwt = require('jsonwebtoken');
const httpStatus = require("http-status");

const { jwtSecret, jwtExpirationInterval } = require('../../config/env')

exports.ADMIN = 'ADMIN';
exports.USER = 'USER';

exports.signWithJwt = (payload) => {
  let token = jwt.sign(
    { userId: payload._id, role: payload.role }, jwtSecret, { expiresIn: jwtExpirationInterval + "h" }
  )
  return token;
}

exports.authenticate = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    const error = new Error('Not authenticated')
    error.statusCode = 401;
    throw error
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtSecret)
  } catch (error) {
    error.statusCode = 401;
    throw error
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated')
    error.statusCode = 401;
    throw error
  }
  req.userId = decodedToken.userId
  req.role = decodedToken.role
  next()

}

exports.authorize = (role) => (req, res, next) => {
  const error = new Error('Forbidden')

  if (role === this.ADMIN) {
    if (req.role != 'admin') {
      error.statusCode = httpStatus.FORBIDDEN;
      return next(error);
    }
  } else if (role === this.USER) {
    if (req.role != 'user') {
      error.statusCode = httpStatus.FORBIDDEN;
      return next(error);
    }
  } else {
    error.statusCode = httpStatus.FORBIDDEN;
    return next(error);
  }
  return next();
}