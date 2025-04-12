import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { products } from './products'

import { createId } from '@paralleldrive/cuid2'

export const suppliers = sqliteTable('suppliers', {
  id: text('id', { length: 255 }).primaryKey().$defaultFn(createId),
  name: text().notNull(),
  email: text(),
  phone: text(),
  address: text(),
  notes: text(),
  createdAt: text().default(new Date().toISOString())
})

export const supplierRelations = relations(suppliers, ({ many }) => ({
  products: many(products)
}))
