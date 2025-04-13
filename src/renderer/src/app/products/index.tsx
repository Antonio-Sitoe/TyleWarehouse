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

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['products-key', currentPage, searchQuery],
    queryFn: () => getProducts({ page: currentPage, search: searchQuery })
  })

  const suppliers = data?.items || []
  const totalPages = data?.meta.totalItems || 1
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

      <div className="flex items-center mb-6 mt-6">
        <Input
          placeholder="Pesquisa por nome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <Spinner />
        </div>
      ) : (
        <>
          <ProductsTable products={suppliers} />

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
