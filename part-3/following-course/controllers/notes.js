import express from 'express'
import Note from '../models/note.js'
const notesRouter = express.Router()

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (req, res, next) => {
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

notesRouter.delete('/:id', (req, res, next) => {
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

notesRouter.post('/', (request, response, next) => {
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

notesRouter.put('/:id', (request, respone, next) => {
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

export default notesRouter