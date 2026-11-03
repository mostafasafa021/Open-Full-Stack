import express from 'express'
import morgan from 'morgan'
import Note from './models/note.js'
const app = express()

app.use(express.json())
morgan.token('body', req => `${JSON.stringify(req.body)}`)
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)
app.use(express.static('dist'))

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note.findById(id)
    .then(note => {
      if (note) {
        return res.json(note)
      }

      return res.status(404).end()
    })
    .catch(next)
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note.findByIdAndDelete(id)
    .then(note => {
      if (note) {
        return res.status(204).end()
      }

      return res.status(404).end()
    })
    .catch(next)
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then(note => {
      response.status(201).json(note)
    })
    .catch(next)
})

app.put('/api/notes/:id', (request, respone, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return respone.status(404).end()
      }
      note.content = content
      note.important = important

      return note.save().then(updatedNote => {
        respone.json(updatedNote)
      })
    })
    .catch(next)
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandling = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'malformatted Id' })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message })
  }

  next(err)
}

app.use(errorHandling)
