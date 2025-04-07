'use server'

import { api } from '@/lib/axios'
import { ISupplier, Supplier } from '@shared/zod/suppliers'

export async function fetchSuppliers({ page = 1, pageSize = 10, search = '' }) {
  const { data } = await api.get<ISupplier>(
    `/suppliers?page=${page}&name=${search}&limit=${pageSize}`
  )
  return data
}

export async function createSupplier(data: Supplier) {
  const response = await api.post<Supplier>('/suppliers', data)
  return response.data
}

export async function updateSupplier(id: string, data: Supplier) {
  const response = await api.put<Supplier>(`/suppliers/${id}`, data)
  return response.data
}

export async function deleteSupplier(id: string | undefined) {
  await api.delete(`/suppliers/${id}`)
}
