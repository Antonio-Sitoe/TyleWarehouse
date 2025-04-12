/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export class BadRequestError extends Error {}
export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unauthorized.')
  }
}

// @ts-ignore
export function errorHandler(error: unknown, _: FastifyRequest, reply: FastifyReply) {
  console.error(error)

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Erro de validação',
      errors: error.flatten().fieldErrors
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message
    })
  }

  if (error instanceof Error) {
    return reply.status(500).send({ message: error.message })
  }

  reply.status(500).send({ message: 'Um erro desconhecido ocorreu' })
}
