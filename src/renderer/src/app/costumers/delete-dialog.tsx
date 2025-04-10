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
import { CostumerSchema } from '@shared/zod/costumer-schema'
import z from 'zod'
import { deleteCostumer } from '@/api/costumers'

type ICustomerType = z.infer<typeof CostumerSchema> & {
  id: string
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: ICustomerType
  onSuccess: () => void
}

export function DeleteDialog({ open, onOpenChange, data, onSuccess }: Props) {
  const mutation = useMutation({
    mutationFn: () => deleteCostumer(data.id),
    onSuccess: () => {
      onOpenChange(false)
      onSuccess()
    }
  })

  if (!data) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza ?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso excluirá permanentemente o fornecedor <strong>{data.name}</strong>. Esta ação não
            pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              mutation.mutate()
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {mutation.isPending ? 'Apagando...' : 'Apagar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
