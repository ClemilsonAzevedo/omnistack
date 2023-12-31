import { Request, Response } from 'express'
import { connection } from '../database/connection'

export class PointsController {
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body

    const trx = await connection.transaction()

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('points').insert(point)

    const point_id = insertedIds[0]
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      }
    })

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return response.json({
      point_id,
      ...point,
    })
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const point = await connection('points').where('id', id).first()

    if (!point) {
      return response.status(400).json({ message: 'point not found' })
    }

    const items = await connection('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return response.json({
      point,
      items,
    })
  }

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()))

    const points = await connection('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return response.json(points)
  }
}
