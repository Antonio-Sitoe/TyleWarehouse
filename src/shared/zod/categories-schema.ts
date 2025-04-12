import { z } from 'zod'

export const createCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: 'Campo Obrigatorio' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
})

export const updateCategorySchema = createCategorySchema.optional()

export type ICategory = z.infer<typeof createCategorySchema>
