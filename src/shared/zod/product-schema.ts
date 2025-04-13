import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  categoryId: z.string().default(''),
  size: z.string(),
  color: z.string(),
  quantity: z.number().int().default(40),
  price: z.number().int(),
  supplierId: z.string(),
  createdAt: z.string().default(new Date().toISOString())
})
