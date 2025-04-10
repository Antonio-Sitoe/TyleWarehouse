import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useState } from 'react'

import bg from '@/assets/bg.jpeg'

const emailFormSchema = z.object({
  email: z.string().min(1, { message: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
  password: z.string().min(2, { message: 'Senha deve ter pelo menos 4 caracteres' })
})

const phoneFormSchema = z.object({
  phone: z.string().min(9, { message: 'Número de telefone é obrigatório' }),
  password: z.string().min(2, { message: 'Senha deve ter pelo menos 4 caracteres' })
})

type EmailFormValues = z.infer<typeof emailFormSchema>
type PhoneFormValues = z.infer<typeof phoneFormSchema>

export function SignIn() {
  const router = useNavigate()
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email')

  // Formulário de email
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Formulário de telefone
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: '',
      password: ''
    }
  })

  // Função para lidar com o envio do formulário de email
  function onEmailSubmit(data: EmailFormValues) {
    console.log('Email form submitted:', data)
    try {
      // await authenticate({ email })
      router('/app')
      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => {}
        }
      })
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  function onPhoneSubmit(data: PhoneFormValues) {
    console.log('Phone form submitted:', data)
    try {
      // await authenticate({ email })
      router('/app')
      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => {}
        }
      })
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left side - Ceramic tiles image */}
      <div className="relative hidden md:block">
        <img src={bg} alt="Caixas de Tijoleiras cerâmicas" className="h-full w-full object-cover" />
      </div>

      {/* Right side - Authentication form */}
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Bem-vindo</h1>
            <p className="text-muted-foreground">Entre na sua conta para continuar</p>
          </div>

          <Tabs
            defaultValue="email"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'email' | 'phone')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Telefone</TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4 pt-4">
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={emailForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Senha</FormLabel>
                          <a href="#" className="text-sm text-primary hover:underline">
                            Esqueceu a senha?
                          </a>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4 pt-4">
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Telefone</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="+258 (84) 898-4953" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={phoneForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Senha</FormLabel>
                          <a href="#" className="text-sm text-primary hover:underline">
                            Esqueceu a senha?
                          </a>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
