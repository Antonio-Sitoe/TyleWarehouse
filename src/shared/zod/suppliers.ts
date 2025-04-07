import { z } from 'zod'
import { ApiReturn } from '../types/types'

export const supplierSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: 'O nome é obrigatório'
    })
    .min(1, 'O nome é obrigatório'),
  email: z.string().email('Formato de email inválido'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  address: z.string().min(1, 'O endereço é obrigatório'),
  notes: z.string().optional()
})

export const updateSupplierSchema = supplierSchema.partial()

export type Supplier = z.infer<typeof supplierSchema> & {
  createdAt?: string
}

export type ISupplier = ApiReturn<Supplier[]>
