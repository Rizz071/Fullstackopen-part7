const jwt = require('jsonwebtoken')

const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    console.log('authorization', authorization)

    if (authorization && authorization.startsWith('Bearer ')) {
        const tokenToDecode = authorization.replace('Bearer ', '')

        const decodedToken = jwt.verify(tokenToDecode, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        console.log('Token decoded in middleware', decodedToken)
        request.token = decodedToken
    }

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

module.exports = {
    requestLogger,
    tokenExtractor,
    unknownEndpoint,
    errorHandler
}