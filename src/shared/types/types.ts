export interface ActionReturn<T = null, K = Error> {
  error: K | null
  data: T | null
}

type Nodes = boolean | string | number | undefined
export interface PaginationQueryParams extends Record<string, Nodes> {
  page: number
  limit?: number
  search?: string
}

export interface ApiMetadata {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
  nextPage: number | null
}

export interface ApiReturn<T> {
  items: T
  meta: ApiMetadata
}
