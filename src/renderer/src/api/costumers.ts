import { api } from '@/lib/axios'
import { ApiReturn } from '@shared/types/types'
import { CostumerSchema, ICustomerData } from '@shared/zod/costumer-schema'
import z from 'zod'

export async function getCostumers({ page = 1, pageSize = 10, search = '' }) {
  const { data } = await api.get<ApiReturn<ICustomerData[]>>(
    `/costumers?page=${page}&name=${search}&limit=${pageSize}`
  )
  return data
}

export async function createCostumer(data: z.infer<typeof CostumerSchema>) {
  const response = await api.post<z.infer<typeof CostumerSchema>>('/costumers', data)
  return response.data
}

export async function updateCostumer(id: string, data: z.infer<typeof CostumerSchema>) {
  const response = await api.put<z.infer<typeof CostumerSchema>>(`/costumers/${id}`, data)
  return response.data
}

export async function deleteCostumer(id: string | undefined) {
  await api.delete(`/costumers/${id}`)
}
