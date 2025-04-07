'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Spinner } from '@/components/ui/spinner'
import { SupplierDialog } from './supplier-dialog'
import { SuppliersTable } from './suppliers-table'
import { fetchSuppliers } from '@/api/suppliers'
import { DeleteSupplierDialog } from './delete-supplier-dialog'
import { Supplier } from '@shared/zod/suppliers'

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>({} as Supplier)
  const pageSize = 10

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['suppliers', currentPage, searchQuery],
    queryFn: () => fetchSuppliers({ page: currentPage, pageSize, search: searchQuery })
  })

  const suppliers = data?.items || []
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
    <div className="container py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Funcionários</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar funcionários
        </Button>
      </div>

      <div className="flex items-center">
        <Input
          placeholder="Search by name..."
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
          <SuppliersTable suppliers={suppliers} onEdit={handleEdit} onDelete={handleDelete} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <SupplierDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={handleSuccess}
      />

      <SupplierDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        supplier={selectedSupplier}
        onSuccess={handleSuccess}
      />

      <DeleteSupplierDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        supplier={selectedSupplier}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
