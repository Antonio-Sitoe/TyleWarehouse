import { FastifyInstance } from 'fastify'
import { createCategorySchema } from '../../shared/zod/categories-schema'
import { categoriesService } from '../models/actions/categories'
import { paginationSchema, queryIdSchema } from '../../shared/zod/pagination'

export function categoryControllers(app: FastifyInstance) {
  app.post('/categories', async (request, reply) => {
    const { name } = createCategorySchema.parse(request.body)
    const categories = await categoriesService.create({ name })
    return reply.code(201).send({ data: categories })
  })

  app.put('/categories/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { name } = createCategorySchema.parse(request.body)
    const updatedCategory = await categoriesService.update({ id, name })
    return reply.code(200).send({ data: updatedCategory })
  })

  app.get('/categories/:id', async (request, reply) => {
    const { id } = queryIdSchema.parse(request.params)
    const data = await categoriesService.getById(id)
    return reply.code(200).send({ data: data })
  })

  app.get('/categories', async (request, reply) => {
    const query = paginationSchema.parse(request.query)
    const { data, totalItems } = await categoriesService.getAll(query.page, query.limit, query.name)
    const totalPages = Math.ceil(totalItems / query.limit)
    return reply.status(200).send({
      meta: {
        totalItems,
        itemCount: data.length,
        itemsPerPage: query.limit,
        totalPages,
        currentPage: query.page,
        nextPage: query.page < totalPages ? query.page + 1 : null
      },
      items: data
    })
  })

  app.delete('/categories/:id', async (request, reply) => {
    const { id } = queryIdSchema.parse(request.params)
    await categoriesService.delete(id)
    return reply.code(204).send()
  })
}
