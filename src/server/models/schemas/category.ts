import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { products } from './products'

export const categories = sqliteTable('category', {
  id: text('id', { length: 255 }).primaryKey().$defaultFn(createId),
  name: text().notNull().unique().default(''),
  createdAt: text().default(new Date().toISOString()),
  updatedAt: text().default(new Date().toISOString())
})

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products)
}))
