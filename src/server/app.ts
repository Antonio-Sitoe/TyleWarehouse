import Fastify from 'fastify'
import cors from '@fastify/cors'

import { errorHandler } from './erros/errorHandler'
import { suppliersControllers } from './controllers/suppliers'
import { costumerControllers } from './controllers/custumer'
import { categoryControllers } from './controllers/categories'
import { productControllers } from './controllers/products'

const app = Fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
})

app.get('/', () => ({ hello: 'world' }))
app.register(suppliersControllers)
app.register(costumerControllers)
app.register(categoryControllers)
app.register(productControllers)

app.setErrorHandler(errorHandler)

export async function startServer() {
  return await app
    .listen({ port: 3333 })
    .then(() => {
      console.log('Server is running on port http://localhost:3333')
    })
    .catch((err) => {
      app.log.error(err)
      process.exit(1)
    })
}
