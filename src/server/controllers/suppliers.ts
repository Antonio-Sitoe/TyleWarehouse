import { FastifyInstance } from 'fastify'
import { supplierSchema, updateSupplierSchema } from '../../shared/zod/suppliers'
import { supplierService } from '../models/actions/supliers'
import { errorHandler } from '../erros/errorHandler'
import { BadRequestError } from '../erros/errorHandler'

export async function suppliersControllers(app: FastifyInstance) {
  app.post('/suppliers', async (req, reply) => {
    try {
      const data = supplierSchema.parse(req.body)
      const newSupplier = await supplierService.createSupplier(data)
      return reply.status(201).send(newSupplier)
    } catch (error) {
      return errorHandler(error, req, reply)
    }
  })

  app.get('/suppliers', async (req, reply) => {
    const {
      name,
      page = 1,
      limit = 10
    } = req.query as { name?: string; page?: number; limit?: number }
    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    try {
      const { suppliers, totalItems } = await supplierService.getAllSuppliers(
        pageNumber,
        limitNumber,
        name
      )
      const totalPages = Math.ceil(totalItems / limitNumber)

      return reply.status(200).send({
        meta: {
          totalItems,
          itemCount: suppliers.length,
          itemsPerPage: limitNumber,
          totalPages,
          currentPage: pageNumber,
          nextPage: pageNumber < totalPages ? pageNumber + 1 : null
        },
        items: suppliers
      })
    } catch (error) {
      return errorHandler(error, req, reply)
    }
  })

  app.get('/suppliers/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const supplier = await supplierService.getSupplierById(id)
      if (!supplier) {
        throw new BadRequestError('Fornecedor não encontrado')
      }
      return reply.status(200).send(supplier)
    } catch (error) {
      return errorHandler(error, req, reply)
    }
  })

  app.put('/suppliers/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const data = updateSupplierSchema.parse(req.body)
      const { name, address, phone, notes } = data
      const updatedSupplier = await supplierService.updateSupplier(id, name, address, phone, notes)
      if (!updatedSupplier) {
        throw new BadRequestError('Fornecedor não encontrado')
      }
      return reply.status(200).send(updatedSupplier)
    } catch (error) {
      return errorHandler(error, req, reply)
    }
  })

  app.delete('/suppliers/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const deletedSupplier = await supplierService.deleteSupplier(id)
      if (!deletedSupplier) {
        throw new BadRequestError('Fornecedor não encontrado')
      }
      return reply.status(200).send({ message: 'Fornecedor deletado com sucesso' })
    } catch (error) {
      return errorHandler(error, req, reply)
    }
  })
}
