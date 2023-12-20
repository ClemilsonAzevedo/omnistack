import express from 'express'
import { connection } from './database/connection'

export const routes = express.Router()

routes.get('/items', async (request, response) => {
  const items = await connection.select('*').from('items')
  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  })
  return response.json(serializedItems)
})

routes.post('/points', async (request, response) => {
  const { name, email, whatsapp, latitude, longitude, city, uf, items } =
    request.body

  const ids = await connection('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  })

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id: ids[0],
    }
  })

  await connection('point_items').insert(pointItems)
  return response.json({ sucess: true })
})
