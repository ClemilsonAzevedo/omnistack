import express from 'express'
import { routes } from './routes'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:${PORT}`)
})
