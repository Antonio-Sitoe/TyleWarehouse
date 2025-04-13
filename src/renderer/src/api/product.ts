/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'
import { ApiReturn } from '@shared/types/types'
import { IProduct } from '@shared/zod/product-schema'

export async function getProducts({ page = 1, pageSize = 10, search = '' }) {
  const { data } = await api.get<ApiReturn<IProduct[]>>(
    `/products?page=${page}&name=${search}&limit=${pageSize}`
  )
  return data
}

export async function createProduct(productData: any) {
  try {
    const response = await api.post('/products', productData)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw new Error('Failed to create product')
  }
}

export async function updateProduct(productData: any) {
  try {
    const { id, ...data } = productData
    if (data.supplierId === 'none') {
      data.supplierId = null
    }

    const response = await api.patch(`/products/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw new Error('Failed to update product')
  }
}

export async function deleteProduct(productId: string) {
  try {
    await api.delete(`/products/${productId}`)
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw new Error('Failed to delete product')
  }
}
