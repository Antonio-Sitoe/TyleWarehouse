import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { Textarea } from './ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from '@/api/update-profile'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const schema = z.object({
  name: z.string().min(1),
  description: z.string()
})

type STORE_SCHEMA = z.infer<typeof schema>

export function StoreProfile(): JSX.Element {
  const queryClient = useQueryClient()
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity
  })

  const { handleSubmit, register } = useForm<STORE_SCHEMA>({
    resolver: zodResolver(schema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? ''
    }
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ description, name }) => {
      const { cached } = updateManageRestauranteCache({ name, description })
      return { previousProfile: cached }
    },
    onError: (__, _, context) => {
      if (context?.previousProfile) {
        updateManageRestauranteCache(context?.previousProfile)
      }
    }
  })

  function updateManageRestauranteCache({ name, description }: STORE_SCHEMA): {
    cached: STORE_SCHEMA
  } {
    const cached = queryClient.getQueryData(['managed-restaurant']) as unknown as STORE_SCHEMA
    if (cached) {
      queryClient.setQueryData(['managed-restaurant'], {
        ...cached,
        name,
        description
      })
    }
    return { cached }
  }

  async function handleUpdateProfile({ name, description }: STORE_SCHEMA): Promise<void> {
    try {
      await updateProfileFn({ description, name })
      toast.success('Perfil atualizado com sucesso')
    } catch (error) {
      toast.error('Falha ao atualizar o perfil')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seus clientes
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="grid gap-4 py-4 space-y-4">
          <div className="grid grid-cols-4  items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="h-8 col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4  items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descricao
            </Label>
            <Textarea className="h-8 col-span-3" id="description" {...register('description')} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-emerald-500 text-white"
            disabled={isLoadingManagedRestaurant}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
