'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CostumerSchema, ICustomerData } from '@shared/zod/costumer-schema'
import { createCostumer, updateCostumer } from '@/api/costumers'

interface Props {
  open: boolean
  supplier?: ICustomerData
  onSuccess: () => void
  onOpenChange: (item: boolean) => void
}

export function CreateEditDialog({ open, onOpenChange, supplier, onSuccess }: Props) {
  const isEditing = !!supplier

  const form = useForm({
    resolver: zodResolver(CostumerSchema),
    defaultValues: {
      name: '',
      phone: ''
    }
  })

  useEffect(() => {
    if (supplier) {
      form.reset({
        id: supplier.id || '',
        name: supplier.name,
        phone: supplier.phone || ''
      })
    } else {
      form.reset({
        id: '',
        name: '',
        phone: ''
      })
    }

    return () => {
      form.reset()
    }
  }, [supplier, form, open])

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof CostumerSchema>) => createCostumer(data),
    onSuccess: () => {
      onOpenChange(false)
      form.reset()
      onSuccess()
    }
  })

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof CostumerSchema>) => updateCostumer(data.id!, data),
    onSuccess: () => {
      onOpenChange(false)
      form.reset()
      onSuccess()
    }
  })

  const onSubmit = (data: z.infer<typeof CostumerSchema>) => {
    if (data?.id) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Cliente' : 'Adicionar Cliente'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvar...' : isEditing ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
