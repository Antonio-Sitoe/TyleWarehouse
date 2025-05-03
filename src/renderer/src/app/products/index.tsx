import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { AddProductModal } from './add-edit-modal'
import { Pagination } from '@/components/ui/pagination'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/product'
import { Spinner } from '@/components/ui/spinner'
import { ProductsTable } from './table'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { fetchSuppliers } from '@/api/suppliers'
import { getCategory } from '@/api/category'
import { exportProducts } from './excell-export'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryId, setCategoryId] = useState('')
  const [size, setSize] = useState('')
  const [supplierId, setsupplierId] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['products-key', currentPage, searchQuery, supplierId, size, categoryId],
    queryFn: () =>
      getProducts({ page: currentPage, search: searchQuery, supplierId, size, categoryId })
  })

  const products = data?.items || []
  const totalPages = data?.meta.totalItems || 1

  const { data: categories, isLoading: loadCategory } = useQuery({
    queryKey: ['query-key-category-li'],
    queryFn: async () => {
      const items = await getCategory({ page: 0 })
      return items.items.map((item) => ({ id: item.id, name: item.name }))
    }
  })

  const { data: suppliers, isLoading: loadSuppliers } = useQuery({
    queryKey: ['suppliers-key'],
    queryFn: async () => {
      const items = await fetchSuppliers({ page: 0 })
      return items.items.map((item) => ({ id: item.id, name: item.name }))
    }
  })

  async function handleExportData() {
    try {
      const response = await getProducts({
        page: 0,
        search: searchQuery,
        supplierId,
        size,
        categoryId
      })
      const productsData = response.items || []
      await exportProducts(productsData)
    } catch (error) {
      console.error('Erro ao exportar os dados:', error)
    }
  }
  return (
    <main className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="text-muted-foreground mt-2">Gerencie seu estoque de produtos</p>
        </div>
        <AddProductModal>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Produtos
          </Button>
        </AddProductModal>
      </div>

      <div className="flex items-center gap-4 mb-6 mt-6">
        <Input
          placeholder="Pesquisa por nome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryId} onValueChange={setCategoryId} disabled={loadCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categoria</SelectLabel>
              {(categories || [])?.map((category) => (
                <SelectItem key={category.id} value={category.id!}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um tamanho" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tamanho</SelectLabel>
              <SelectItem value="6x20">6 × 20 cm</SelectItem>
              <SelectItem value="7x23">7 × 23 cm</SelectItem>
              <SelectItem value="6.5x25">6,5 × 25 cm</SelectItem>
              <SelectItem value="10x20">10 × 20 cm</SelectItem>
              <SelectItem value="7x28">7 × 28 cm</SelectItem>
              <SelectItem value="10x30">10 × 30 cm</SelectItem>
              <SelectItem value="6x25">6 × 25 cm</SelectItem>
              <SelectItem value="11x23">11 × 23 cm</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select disabled={loadSuppliers} value={supplierId} onValueChange={setsupplierId}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Selecione o fornecedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fornecedor</SelectLabel>
              {(suppliers || []).map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id!}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {(size || supplierId || categoryId) && (
          <Button
            onClick={() => {
              setCategoryId('')
              setSize('')
              setsupplierId('')
            }}
          >
            Limpar
          </Button>
        )}
        <div className="flex-1 flex items-end justify-end">
          <Button variant="link" onClick={handleExportData}>
            Exportar para excell
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Spinner />
        </div>
      ) : (
        <>
          <ProductsTable products={products} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </main>
  )
}
