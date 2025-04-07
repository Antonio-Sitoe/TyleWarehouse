import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from '@/app/Dashboard'
import Products from '@/app/Products'
import Suppliers from '@/app/Suppliers'
import Customers from '@/app/Customers'
import Sales from '@/app/Sales'
import Stock from '@/app/Stock'
import Reports from '@/app/Reports'
import Settings from '@/app/Settings'
import { SignIn } from './app/sign-in'
import { AppLayout } from './app/_layouts/app'
import { NotFound } from './app/404'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="customers" element={<Customers />} />
          <Route path="sales" element={<Sales />} />
          <Route path="stock" element={<Stock />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
