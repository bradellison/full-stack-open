const { log } = require('console')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

log('Handling index.js backend')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/people', (request, response) => {
  // response.json(people)
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/info', (request, response) => {
  console.log('getting info')
  Person.find({}).then(people => {
    const people_count = `Phonebook has info for ${people.length} people`
    console.log(people_count)
    const currentDateTime = new Date().toString() // Get the current date and time as a string
    const htmlOutput = `
          <p>${people_count}</p>
          <p>${currentDateTime}</p>
      `
    response.send(htmlOutput)
  })
})

app.get('/api/people/:id', (request, response, next) => {
  console.log(`Getting person with id ${request.params.id}`)
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }}).catch(error => next(error))
})


app.delete('/api/people/:id', (request, response, next) => {
  console.log(`Deleting person with id ${request.params.id}`)
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/people/:id', (request, response, next) => {
  const { number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.post('/api/people', (request, response, next) => {
  console.log('POST /api/people')
  const body = request.body
  console.log(body)

  // Fail if the request body is missing required fields
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number is missing from request'
    })
  }

  console.log(Person)
  Person.find({ name: body.name }).then(foundPersons => {
    if (foundPersons.length > 0) {
      return response.status(409).json({
        error: 'Name already exists in the database'
      })

    } else {
      var person = new Person({
        name: body.name,
        number: body.number
      })

      person.save().then(savedPerson => {
        response.json(savedPerson)
      }).catch(error => next(error))
    }
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log('oops we have an error:', error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id2' })
  } else if (error.name === 'ValidationError') {
    console.log('validation error')
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// mongodb+srv://bradellison:<pass>@brad-free-mongodb.ekpic.mongodb.net/?retryWrites=true&w=majority&appName=brad-free-mongodb