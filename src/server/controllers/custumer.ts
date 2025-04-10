import { FastifyInstance } from 'fastify'

import { costumerService } from '../models/actions/costumers'
import { CostumerSchema, updateCostumerSchema } from '../../shared/zod/costumer-schema'
import { paginationSchema } from '../../shared/zod/pagination'

export function costumerControllers(app: FastifyInstance) {
  app.post('/costumers', async (request, reply) => {
    const body = CostumerSchema.parse(request.body)
    const created = await costumerService.create(body)
    return reply.code(201).send(created)
  })

  app.get('/costumers', async (request, reply) => {
    const query = paginationSchema.parse(request.query)
    const { costumers, totalItems } = await costumerService.getAll(
      query.page,
      query.limit,
      query.name
    )
    const totalPages = Math.ceil(totalItems / query.limit)

    return reply.status(200).send({
      meta: {
        totalItems,
        itemCount: costumers.length,
        itemsPerPage: query.limit,
        totalPages,
        currentPage: query.page,
        nextPage: query.page < totalPages ? query.page + 1 : null
      },
      items: costumers
    })
  })

  app.get('/costumers/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const costumer = await costumerService.getById(id)
    if (!costumer) {
      return reply.code(404).send({ message: 'Cliente não encontrado' })
    }
    return reply.send(costumer)
  })

  app.put('/costumers/:id', async (request, reply) => {
    const params = request.params as { id: string }
    const body = updateCostumerSchema.parse(request.body)
    const updated = await costumerService.update(params.id, body)
    return reply.send(updated)
  })

  app.delete('/costumers/:id', async (request, reply) => {
    const params = request.params as { id: string }
    const deleted = await costumerService.delete(params.id)
    return reply.send(deleted)
  })
}
