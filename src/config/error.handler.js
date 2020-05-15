const { env } = require('./env');
const httpStatus = require('http-status');


const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500
  const response = {
    status: 'Error',
    message: error.message,
    data: error.data
  }
  res.status(status).json(response)
}


exports.errorHandler = errorHandler;
/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new Error('Not found');
  err.statusCode = httpStatus.NOT_FOUND
  return errorHandler(err, req, res);
};
