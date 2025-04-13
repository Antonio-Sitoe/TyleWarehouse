import { FastifyInstance } from 'fastify'
import { productSchema } from '../../shared/zod/product-schema'
import { categoriesService } from '../models/actions/categories'
import { supplierService } from '../models/actions/supliers'
import { productService } from '../models/actions/products'
import { paginationSchema, queryIdSchema } from '../../shared/zod/pagination'

export function productControllers(app: FastifyInstance) {
  app.post('/products', async (request, reply) => {
    const data = productSchema.parse(request.body)

    const categoryId = data.categoryId
    const supplierId = data.supplierId

    const category = await categoriesService.getById(categoryId)
    const supplier = await supplierService.getSupplierById(supplierId)

    if (!category) return reply.code(404).send('Categoria nao encontrada')
    if (!supplier) return reply.code(404).send('Fornecedor nao encontrado')

    const product = await productService.create(data)
    return reply.code(201).send({
      data: product,
      message: 'Produto Registrado com Sucesso'
    })
  })

  app.patch('/products/:id', async (request, reply) => {
    const data = productSchema.parse(request.body)
    const { id } = queryIdSchema.parse(request.params)
    const categoryId = data.categoryId
    const supplierId = data.supplierId

    const category = await categoriesService.getById(categoryId)
    const supplier = await supplierService.getSupplierById(supplierId)

    if (!category) return reply.code(404).send('Categoria nao encontrada')
    if (!supplier) return reply.code(404).send('Fornecedor nao encontrado')

    const product = await productService.update(id, data)
    return reply.code(201).send({
      data: product,
      message: 'Produto Atualizado com Sucesso'
    })
  })

  app.get('/products', async (request, reply) => {
    const query = paginationSchema.parse(request.query)
    const { data, totalItems } = await productService.getAll(query.page, query.limit, query.name)
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

  app.get('/products/:id', async (request, reply) => {
    const { id } = queryIdSchema.parse(request.params)
    const product = await productService.getById(id)
    if (!product) {
      return reply.code(404).send('Produto não encontrado')
    }
    return reply.send({
      data: product,
      message: 'Produto obtido com sucesso'
    })
  })

  app.delete('/products/:id', async (request, reply) => {
    const { id } = queryIdSchema.parse(request.params)
    await productService.delete(id)
    return reply.send({
      message: 'Produto deletado com sucesso'
    })
  })
}
