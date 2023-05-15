const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => { 
    var errObj = {
        success: false,
        msg: (err+'').split(':').slice(-1)[0].trim(),
        err
    }

    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(errObj);
}

module.exports = errorHandlerMiddleware;