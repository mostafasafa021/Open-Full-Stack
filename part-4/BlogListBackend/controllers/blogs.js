import express from 'express'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogsRouter.post('/', (req, res, next) => {
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

export default blogsRouter