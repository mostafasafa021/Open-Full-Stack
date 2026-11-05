const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ message: 'Unknown Endpoint' })
  next()
}

const errorHandling = (err, req, res, next) => {
  console.error(err)

  if (err.message === 'CastError') {
    return res.status(400).json({ message: 'Malformated id' })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message })
  }
  next(err)
}

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  next()
}

export default { requestLogger, unknownEndpoint, errorHandling }
