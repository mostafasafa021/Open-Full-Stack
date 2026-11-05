import mongoose from 'mongoose'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import express from 'express'
import config from './utils/config.js'
import notesRouter from './controllers/notes.js'

const app = express()

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch(() => {
    logger.info('failed to connect to mongodb')
  })

app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandling)

export default app
