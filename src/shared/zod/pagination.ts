import { z } from 'zod'

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Página inválida'
    }),

  pageSize: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Tamanho da página inválido'
    }),

  name: z.string().optional()
})
