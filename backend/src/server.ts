import express from 'express'
import cors from 'cors'
import path from 'path'
import { routes } from './routes'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:${PORT}`)
})
