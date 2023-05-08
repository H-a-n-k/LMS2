const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => { 
    var errObj = {
        success: false,
        msg: 'Unknow error: ' + err,
        err
    }

    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(errObj);
}

module.exports = errorHandlerMiddleware;