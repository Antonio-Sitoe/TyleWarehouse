import { cn } from '@/lib/utils'

type OrdersStatus = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

interface OrderStatusProps {
  status: OrdersStatus
}

const orderStatusMap: Record<OrdersStatus, string> = {
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  pending: 'Pendente',
  processing: 'Em preparo'
}

export function OrderStatus({ status }: OrderStatusProps): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          `h-2 w-2 rounded-full`,
          status === 'canceled' && 'bg-rose-500',
          status === 'delivered' && 'bg-emerald-500',
          status === 'delivering' && 'bg-amber-500',
          status === 'pending' && 'bg-slate-500',
          status === 'processing' && 'bg-amber-500'
        )}
      />
      <span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
    </div>
  )
}
