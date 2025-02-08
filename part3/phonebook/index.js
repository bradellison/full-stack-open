const { log } = require('console')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let people = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/people', (request, response) => {
    response.json(people)
})

app.get('/info', (request, response) => {
    const people_count = `Phonebook has info for ${people.length} people`;
    const currentDateTime = new Date().toString(); // Get the current date and time as a string
    const htmlOutput = `
        <p>${people_count}</p>
        <p>${currentDateTime}</p>
    `;
    response.send(htmlOutput);
});

app.get('/api/people/:id', (request, response) => {
    const id = request.params.id
    const person = people.find(person => person.id === id)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/people/:id', (request, response) => {
    const id = request.params.id;
    // Update the `people` array to exclude the specific person
    people = people.filter(person => person.id !== id);
    console.log(`Deleting person with id ${id}`);
    response.status(204).end(); // No Content status
});

const generateId = () => {
    const randomId = Math.floor(Math.random() * 100000)
    return String(randomId)
  }
  
app.post('/api/people', (request, response) => {
    const body = request.body

    // Fail if the request body is missing required fields
    if (!body.name || !body.number) {
        return response.status(400).json({ 
        error: 'Name or number is missing from request' 
        })
    }

    // Fail is the name already exists in the database
    if (people.some(person => person.name === body.name)) {
        return response.status(409).json({ 
            error: 'Name already exists in the database' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    people = people.concat(person)

    response.json(person)
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})