import  express  from "express"

export const routes = express.Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' })
})