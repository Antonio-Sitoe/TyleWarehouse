import { useMutation } from '@tanstack/react-query'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { deleteSupplier } from '@/api/suppliers'
import { Supplier } from '@shared/zod/suppliers'

interface DeleteSupplierDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  supplier: Supplier
  onSuccess: () => void
}

export function DeleteSupplierDialog({
  open,
  onOpenChange,
  supplier,
  onSuccess
}: DeleteSupplierDialogProps) {
  const mutation = useMutation({
    mutationFn: () => deleteSupplier(supplier.id),
    onSuccess: () => {
      onOpenChange(false)
      onSuccess()
    }
  })

  if (!supplier) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the supplier <strong>{supplier.name}</strong>. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              mutation.mutate()
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
