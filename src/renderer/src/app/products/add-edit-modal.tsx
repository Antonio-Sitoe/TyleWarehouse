'use client'

import { ReactNode, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { useToast } from '@/hooks/use-toast'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategory } from '@/api/category'
import { fetchSuppliers } from '@/api/suppliers'
import { createProduct, updateProduct } from '@/api/product'
import { IProduct, productSchema } from '@shared/zod/product-schema'

interface AddProductModalProps {
  children: ReactNode
  data?: IProduct
}

export function AddProductModal({ children, data }: AddProductModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

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

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: data?.name ?? '',
      categoryId: data?.categoryId ?? '',
      size: data?.size ?? '',
      color: data?.color ?? '',
      quantity: data?.quantity ?? 40,
      price: data?.price ?? 1500,
      supplierId: data?.supplierId ?? '',
      createdAt: data?.createdAt ?? new Date().toISOString(),
      id: data?.id ?? ''
    }
  })

  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      if (values.id) {
        await updateProduct(values)
      } else {
        const { id, ...data } = values
        console.log(id)
        await createProduct(data)
      }
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ['products-key'] })
      form.reset()
      toast({
        title: 'Produto criado',
        description: 'O produto foi criado com sucesso'
      })
    } catch (error) {
      console.error('Falha ao criar produto:', error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao criar produto'
      })
    }
  }
  useEffect(() => {
    return () => {
      form.reset()
    }
  }, [form])

  const isLoading = loadCategory && loadSuppliers

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {data?.id ? 'Editar Produto ' + data.name : 'Adicionar Novo Produto'}{' '}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(categories || [])?.map((category) => (
                          <SelectItem key={category.id} value={category.id!}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o fornecedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        {(suppliers || []).map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id!}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="6x20">6 × 20 cm</SelectItem>
                        <SelectItem value="7x23">7 × 23 cm</SelectItem>
                        <SelectItem value="6.5x25">6,5 × 25 cm</SelectItem>
                        <SelectItem value="10x20">10 × 20 cm</SelectItem>
                        <SelectItem value="7x28">7 × 28 cm</SelectItem>
                        <SelectItem value="10x30">10 × 30 cm</SelectItem>
                        <SelectItem value="6x25">6 × 25 cm</SelectItem>
                        <SelectItem value="11x23">11 × 23 cm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input type="color" className="w-12 p-1 h-10" {...field} />
                        <Input
                          type="text"
                          placeholder="Código de cor"
                          {...field}
                          className="flex-1"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
