const createError = require('http-errors');

exports.errorHandler = (err, req, res, next) => {
    const {message="Something went wrong", status=500} = err
    res.status(status).send(message)
}

exports.notFoundHandler = (req, res, next) => {
    return next(createError(404, 'Resource Not Found!'));
}