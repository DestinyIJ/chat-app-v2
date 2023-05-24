const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(err.stack)
    res.status(statusCode).json({
        status: "error",
        message: err?.message,
    })
}

const notFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} not found!`)
    res.status(404).json({
        status: "error",
        message: error?.message,
    })
    next(error)
}

module.exports = {
    notFound,
    errorHandler
}