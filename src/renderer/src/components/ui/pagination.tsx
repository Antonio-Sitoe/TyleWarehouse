'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string // className é opcional
}
export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const renderPageButtons = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pages: any[] = []
    const maxVisiblePages = 5

    // Always show first page
    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? 'default' : 'outline'}
        size="icon"
        onClick={() => onPageChange(1)}
        className="h-8 w-8"
      >
        1
      </Button>
    )

    // Calculate range of visible pages
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3) + 1)
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pages.push(
        <Button key="start-ellipsis" variant="outline" size="icon" disabled className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'default' : 'outline'}
          size="icon"
          onClick={() => onPageChange(i)}
          className="h-8 w-8"
        >
          {i}
        </Button>
      )
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push(
        <Button key="end-ellipsis" variant="outline" size="icon" disabled className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? 'default' : 'outline'}
          size="icon"
          onClick={() => onPageChange(totalPages)}
          className="h-8 w-8"
        >
          {totalPages}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className={cn('flex items-center justify-end space-x-2 mt-5', className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      {renderPageButtons()}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
