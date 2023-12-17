import express from 'express'

const app = express()
app.use(express.json())

const users = ['Clemilson', 'Azevedo', 'Hello']

app.get('/users', (request, response) => {
  response.json(users)
})

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users[id]
  return response.json(user)
})

app.post('/users', (request, response) => {
  const data = request.body

  const user = {
    name: data.name,
    email: data.email,
  }

  return response.json(user)
})

app.listen(3333)
