import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: 'O nome do produto é obrigatório' })
    .min(1, 'Nome é obrigatório'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  size: z.string({ required_error: 'O tamanho é obrigatório' }).min(1, 'Tamanho é obrigatório'),
  color: z.string({ required_error: 'A cor é obrigatória' }).min(1, 'Cor é obrigatória'),
  quantity: z.coerce
    .number({
      required_error: 'A quantidade é obrigatória',
      invalid_type_error: 'A quantidade deve ser um número inteiro'
    })
    .min(0, 'A quantidade deve ser um número positivo'),
  price: z.coerce
    .number({
      required_error: 'O preço é obrigatório',
      invalid_type_error: 'O preço deve ser um número inteiro'
    })
    .min(1, 'O preço deve ser maior que 0'),
  supplierId: z.string().min(1, 'Fornecedor é obrigatório'),
  createdAt: z
    .string({ required_error: 'A data de criação é obrigatória' })
    .default(new Date().toISOString())
    .optional()
})

export type IProduct = z.infer<typeof productSchema> & {
  categoryName?: string
  supplierName?: string
}
