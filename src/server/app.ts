import Fastify from 'fastify'
import cors from '@fastify/cors'
import { suppliersControllers } from './controllers/suppliers'
import { errorHandler } from './erros/errorHandler'

const app = Fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

app.get('/', () => ({ hello: 'world' }))
app.register(suppliersControllers)

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
