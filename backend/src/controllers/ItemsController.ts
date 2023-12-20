import { Request, Response } from 'express'
import { connection } from '../database/connection'

export class ItemsController {
  async Index(request: Request, response: Response) {
    const items = await connection('*').from('items')
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      }
    })
    return response.json(serializedItems)
  }
}
