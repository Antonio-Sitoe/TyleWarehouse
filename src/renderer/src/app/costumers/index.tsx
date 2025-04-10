import { Button } from '@/components/ui/button'
import { TableMain } from './table'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { DeleteDialog } from './delete-dialog'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { CreateEditDialog } from './create-edit-dialog'
import { useQuery } from '@tanstack/react-query'
import { getCostumers } from '@/api/costumers'
import { ICustomerData } from '@shared/zod/costumer-schema'

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<ICustomerData>({} as ICustomerData)
  const pageSize = 10

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['/costumers-fsfdfsdf', currentPage, searchQuery],
    queryFn: () => getCostumers({ page: currentPage, pageSize, search: searchQuery })
  })

  const costumers = data?.items || []
  const totalPages = data?.meta.totalItems || 1

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier)
    setIsDeleteDialogOpen(true)
  }

  const handleSuccess = () => {
    refetch()
  }
  return (
    <main>
      <div className="flex justify-between items-center">
        <div className="p-6">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground mt-2">Gestao de clientes</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Clientes
        </Button>
      </div>

      <div className="flex items-center mb-2">
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
          <TableMain data={costumers} onEdit={handleEdit} onDelete={handleDelete} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <CreateEditDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={handleSuccess}
      />

      <CreateEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        supplier={selectedSupplier}
        onSuccess={handleSuccess}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        data={selectedSupplier}
        onSuccess={handleSuccess}
      />
    </main>
  )
}
