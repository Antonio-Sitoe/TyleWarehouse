import { relations } from 'drizzle-orm'
import { suppliers } from './suppliers'
import { categories } from './category'
import { createId } from '@paralleldrive/cuid2'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable('products', {
  id: text('id', { length: 255 }).primaryKey().$defaultFn(createId),
  name: text().notNull(),
  categoryId: text()
    .references(() => categories.id, {
      onDelete: 'cascade'
    })
    .notNull()
    .default(''),
  size: text().notNull(),
  color: text().notNull(),
  quantity: integer().default(40).notNull(),
  price: integer().notNull(),
  supplierId: text().references(() => suppliers.id, {
    onDelete: 'cascade'
  }),
  createdAt: text().default(new Date().toISOString())
})

export const productsRelations = relations(products, ({ one }) => ({
  supplier: one(suppliers, {
    fields: [products.supplierId],
    references: [suppliers.id]
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id]
  })
}))

export type IProductInsert = typeof products.$inferInsert
