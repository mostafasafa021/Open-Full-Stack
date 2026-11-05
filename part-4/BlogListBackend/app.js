import express from 'express'
import config from './utils/config.js'
import mongoose from 'mongoose'
import middleware from './utils/middleware.js'

const app = express()

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

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

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

app.post('/api/blogs', (req, res, next) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  blog
    .save()
    .then(blog => {
      res.status(201).json(blog)
    })
    .catch(next)
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandling)

export default app
