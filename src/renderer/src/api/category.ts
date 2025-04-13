import { api } from '@/lib/axios'
import { ApiReturn } from '@shared/types/types'
import { ICategory } from '@shared/zod/categories-schema'

export async function getCategory({ page = 1, pageSize = 10, search = '' }) {
  const { data } = await api.get<ApiReturn<ICategory[]>>(
    `/categories?page=${page}&name=${search}&limit=${pageSize}`
  )
  return data
}

export async function createCategory({ name }: { name: string }) {
  const { data } = await api.post('/categories', { name })
  return data
}

export async function updateCategory({ name, id }: { name: string; id: string }) {
  const { data } = await api.put('/categories/' + id, { name })
  return data
}

export async function deleteCategory(id: string) {
  const { data } = await api.delete('/categories/' + id)
  return data
}
