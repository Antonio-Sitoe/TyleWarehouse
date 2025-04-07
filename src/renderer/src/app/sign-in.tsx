import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import { signIn } from '@/api/signi-in'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pizza } from 'lucide-react'

const signInSchema = z.object({
  email: z.string().email()
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const router = useNavigate()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? ''
    }
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn
  })

  async function handleAuthenticate({ email }: SignInSchema): Promise<void> {
    try {
      // await authenticate({ email })
      router('/app')
      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => authenticate({ email })
        }
      })
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>
        <div className="mt-auto">
          <footer className="text-sm">
            Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="lg:p-8">
          <a
            href="/sign-up"
            className={twMerge(
              buttonVariants({ variant: 'ghost' }),
              'absolute right-4 top-4 md:right-8 md:top-8'
            )}
          >
            Novo estabelecimento
          </a>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
              <p className="text-sm text-muted-foreground">
                Acompanhe suas vendas pelo painel do parceiro!
              </p>
            </div>

            <div className="grid gap-6">
              <form onSubmit={handleSubmit(handleAuthenticate)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Seu e-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      {...register('email')}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    Acessar painel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
