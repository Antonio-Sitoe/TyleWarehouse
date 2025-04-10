import { z } from 'zod'

export const CostumerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().optional()
})

export const updateCostumerSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório').optional(),
  phone: z.string().optional()
})

export type ICustomerData = {
  name: string
  phone: string
  createdAt: string
  id: string
}
