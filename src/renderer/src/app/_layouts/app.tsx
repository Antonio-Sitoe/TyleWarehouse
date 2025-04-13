/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Menu,
  Home,
  Package,
  Users,
  ShoppingCart,
  Boxes,
  BarChart3,
  Settings,
  Truck as Truck2,
  Book
} from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { isAxiosError } from 'axios'
import { useLayoutEffect } from 'react'

import { api } from '@/lib/axios'
import { ThemeToggle } from '@/components/theme/theme-toggle'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/app', icon: Home },
  { title: 'Produtos (Stock)', href: '/app/products', icon: Package },
  { title: 'Fornecedores', href: '/app/suppliers', icon: Truck2 },
  { title: 'Clientes', href: '/app/customers', icon: Users },
  { title: 'Sales', href: '/app/sales', icon: ShoppingCart },
  { title: 'Stock', href: '/app/stock', icon: Boxes },
  { title: 'Reports', href: '/app/reports', icon: BarChart3 },
  { title: 'Definições', href: '/app/settings', icon: Settings }
]

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigate = useNavigate()

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', {
              replace: true
            })
          }
        }

        return Promise.reject(error)
      }
    )

    return (): void => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-gray-50/40 dark:bg-card">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6" />
            <h2 className="text-2xl font-bold tracking-tight">Tyle.WareHouse</h2>
          </div>
        </div>
        <ScrollArea className="flex-1 px-3">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                    isActive && 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-50'
                  )
                }
              >
                {/* @ts-ignore */}
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
            <ThemeToggle />
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile Header & Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <div className="flex lg:hidden border-b">
          <div className="flex items-center gap-2 p-4">
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <div className="flex items-center gap-2">
              <Book className="h-6 w-6" />
              <h2 className="text-2xl font-bold tracking-tight">Tyle.WareHouse</h2>
            </div>
          </div>
        </div>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight">Tyle.WareHouse</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <nav className="flex flex-col gap-2 p-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                      isActive && 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                    )
                  }
                >
                  {/* @ts-ignore */}
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-screen flex-col antialiased">
          <div className="flex flex-1 flex-col gap-4 p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
