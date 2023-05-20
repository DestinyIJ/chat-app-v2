const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode)
    console.log(err)
    res.json({
        message: err?.message,
    })
}

const notFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} not found!`)
    res.status(404)
    next(error)
}

module.exports = {
    notFound,
    errorHandler
}