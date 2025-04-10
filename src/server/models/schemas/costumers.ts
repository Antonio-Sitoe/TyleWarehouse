import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const costumer = sqliteTable('costumer', {
  id: text('id', { length: 255 }).primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  phone: text('phone'),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString())
})
