import logger from './logger.js'

const errorHandling = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'malformatted Id' })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message })
  }

  next(err)
}

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}

const requestLogger = (req,res,next) => {
  logger.info('Method',req.method)
  logger.info('Path',req.path)
  logger.info('Body',req.body)
  next()
}

export default {
  errorHandling,
  unknownEndpoint,
  requestLogger
}
