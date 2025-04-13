import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { AddProductModal } from './add-edit-modal'
import { ConfirmDialog } from '@/components/delete-dialog'
import { IProduct } from '@shared/zod/product-schema'
import { Edit, Trash2 } from 'lucide-react'
import { deleteProduct } from '@/api/product'
import { useQueryClient } from '@tanstack/react-query'

interface ProductsTableProps {
  products: IProduct[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [isOpen, setIsopen] = useState(false)
  const queryClient = useQueryClient()
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null)

  const handleProductDeleted = async () => {
    if (productToDelete?.id) {
      await deleteProduct(productToDelete?.id)
      setProductToDelete(null)
    }
    queryClient.invalidateQueries({ queryKey: ['products-key'] })
  }
  useEffect(() => {
    if (isOpen == false) {
      setProductToDelete(null)
    }
  }, [isOpen])

  console.log('productToDelete', productToDelete)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.categoryName || product.categoryId}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: product.color }}
                      />
                      {product.color}
                    </div>
                  </TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{formatCurrency(product.price / 100)}</TableCell>
                  <TableCell>{product?.supplierName || 'N/A'}</TableCell>
                  <TableCell className="text-right" align="right">
                    <div className="flex space-x-2 justify-end">
                      <AddProductModal data={product}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                      </AddProductModal>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setProductToDelete(product)
                          setIsopen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Deletar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {productToDelete && (
        <ConfirmDialog
          open={isOpen}
          onOpenChange={setIsopen}
          onConfirm={handleProductDeleted}
          cancelButtonText="Cancelar"
          confirmButtonText="Apagar"
          title="Deseja apagar?"
          description="Você tem certeza que deseja apagar?"
        />
      )}
    </>
  )
}
