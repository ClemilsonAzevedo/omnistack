import express from 'express'
import { PointsController } from './controllers/PointsController'
import { ItemsController } from './controllers/ItemsController'

const pointsController = new PointsController()
const itemsController = new ItemsController()

export const routes = express.Router()

routes.get('/items', itemsController.Index)
routes.post('/points', pointsController.create)
