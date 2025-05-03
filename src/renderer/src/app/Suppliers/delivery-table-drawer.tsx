'use client'

import { ReactNode } from 'react'
import { ChevronUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/product'
import { Spinner } from '@/components/ui/spinner'
import { formatDate } from '@/lib/utils'

interface Props {
  children: ReactNode
  supplierId: string
}
const queryFn = async (supplierId: string) => {
  const data = await getProducts({ page: 0, supplierId })
  return (
    data.items.map((item) => ({
      id: item.id,
      product: item.name,
      quantity: item.quantity,
      date: item.createdAt
    })) || []
  )
}
export function DeliveryTableDrawer({ children, supplierId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['get-products-by-supplierId', supplierId],
    queryFn: async () => await queryFn(supplierId)
  })

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle className="text-left text-xl">Registro de Entregas</DrawerTitle>
            <DrawerDescription className="text-left">
              Lista de produtos entregues, quantidades e datas
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <ScrollArea className="h-[50vh]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Produto Entregue</TableHead>
                      <TableHead className="font-medium text-center">Quantidade</TableHead>
                      <TableHead className="font-medium text-right">Data da Entrega</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        {(data || []).map((item, index) => (
                          <TableRow key={`${item.id}-${index}`}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right">
                              {item.date ? formatDate(item.date) : ''}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full gap-2">
                <ChevronUp className="h-4 w-4" />
                Fechar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
