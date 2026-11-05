import express from 'express'
import config from './utils/config.js'
import mongoose from 'mongoose'
import middleware from './utils/middleware.js'
import blogsRouter from './controllers/blogs.js'
const app = express()

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch(err => {
    console.log('Failed to connect to mongodb', err)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandling)

export default app
