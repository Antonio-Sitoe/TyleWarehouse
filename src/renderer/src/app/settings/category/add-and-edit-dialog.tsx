import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactNode, useState } from 'react'
import { createCategory, updateCategory } from '@/api/category'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.'
  })
})

export function DialogCategory({
  children,
  data
}: {
  children: ReactNode
  data?: {
    id: string
    name: string
  }
}) {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data?.id ?? '',
      name: data?.name ?? ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const queryFn = async () => {
      if (data?.id) {
        await updateCategory({ id: data.id, name: data.name })
      } else {
        await createCategory({ name: data.name })
      }
    }

    toast.promise(queryFn, {
      loading: 'Carregando',
      error: (err) => {
        if (isAxiosError(err)) {
          return err.response?.data?.message?.toLowerCase().includes('uniq')
            ? 'Ja existe uma categoria com esse nome'
            : err.response?.data?.message
        }
        return 'Ja existe uma categoria com esse nome'
      },
      success() {
        setIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ['query-key-category'] })
        return 'Categoria salva com sucesso'
      },
      finally() {
        form.reset()
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data?.id ? 'Editar Categoria' : 'Adicionar Categoria'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="antonio.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
