import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { suppliers } from './suppliers'
import { createId } from '@paralleldrive/cuid2'

export const products = sqliteTable('products', {
  id: text('id', { length: 255 }).primaryKey().$defaultFn(createId),
  name: text('name').notNull(), // Name of the product
  category: text('category').notNull(), // Product category (ex: floor, wall)
  size: text('size').notNull(), // Product size (ex: 30x30, 40x40)
  color: text('color').notNull(),
  quantity: integer('quantity').default(40).notNull(),
  price: integer('price').notNull(),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  createdAt: text('created_at').default(new Date().toISOString())
})

export const productsRelations = relations(products, ({ one }) => ({
  supplier: one(suppliers, {
    fields: [products.supplierId],
    references: [suppliers.id]
  })
}))
