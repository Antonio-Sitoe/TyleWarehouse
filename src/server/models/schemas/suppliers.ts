import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { products } from './products'

import { createId } from '@paralleldrive/cuid2'

export const suppliers = sqliteTable('suppliers', {
  id: text('id', { length: 255 }).primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  notes: text('notes'),
  createdAt: text('created_at').default(new Date().toISOString())
})

export const supplierRelations = relations(suppliers, ({ many }) => ({
  products: many(products)
}))
