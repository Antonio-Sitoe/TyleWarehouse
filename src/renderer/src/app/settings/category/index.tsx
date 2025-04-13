import { deleteCategory, getCategory } from '@/api/category'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Pagination } from '@/components/ui/pagination'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteIcon, Edit, Plus } from 'lucide-react'
import { useState } from 'react'
import { DialogCategory } from './add-and-edit-dialog'
import { Spinner } from '@/components/ui/spinner'
import { ConfirmDialog } from '@/components/delete-dialog'

export function CategoryCard() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSeleted] = useState('')

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['query-key-category', currentPage],
    queryFn: () => getCategory({ page: currentPage, pageSize: 6 })
  })

  const categories = data?.items || []
  const totalPages = data?.meta.totalItems || 1

  async function handleDelete() {
    try {
      await deleteCategory(selected)
      setSeleted('')
      queryClient.invalidateQueries({ queryKey: ['query-key-category'] })
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <Card className="mt-5">
        <CardHeader className="flex-row items-start justify-between">
          <section>
            <CardTitle>Categorias</CardTitle>
            <CardDescription className="mt-1">Defina categorias para o sistema</CardDescription>
          </section>
          <div>
            <DialogCategory>
              <Button>
                <Plus />
              </Button>
            </DialogCategory>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Spinner />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead colSpan={7} className="w-[150px]">
                      Data de criação
                    </TableHead>
                    <TableHead className="text-right" align="right">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="italic text-center text-gray-500">
                        Sem dados
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {categories.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell colSpan={7} className="font-medium w-[150px]">
                        {invoice.name}
                      </TableCell>
                      <TableCell className="border">
                        {invoice.createdAt ? formatDate(invoice.createdAt) : '---'}
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-2">
                        <DialogCategory data={{ id: invoice.id!, name: invoice.name }}>
                          <Button variant="outline">
                            <Edit />
                          </Button>
                        </DialogCategory>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsDeleteDialogOpen(true)
                            setSeleted(invoice.id!)
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-end">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </CardFooter>
      </Card>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        cancelButtonText="Cancelar"
        confirmButtonText="Apagar"
        title="Gostaria de apagar?"
        description="Voce tem certeza que pretende apagar?"
      />
    </>
  )
}
