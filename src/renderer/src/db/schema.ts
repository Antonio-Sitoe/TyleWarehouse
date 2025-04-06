import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  size: text('size').notNull(),
  color: text('color').notNull(),
  quantity: integer('quantity').notNull().default(0),
  price: real('price').notNull(),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const suppliers = sqliteTable('suppliers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone').notNull(),
  address: text('address'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const sales = sqliteTable('sales', {
  id: integer('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id),
  total: real('total').notNull(),
  discount: real('discount').default(0),
  tax: real('tax').default(0),
  status: text('status').notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const saleItems = sqliteTable('sale_items', {
  id: integer('id').primaryKey(),
  saleId: integer('sale_id').references(() => sales.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
  subtotal: real('subtotal').notNull()
});

export const stockMovements = sqliteTable('stock_movements', {
  id: integer('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  type: text('type').notNull(), // 'in' or 'out'
  quantity: integer('quantity').notNull(),
  reason: text('reason').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const cashTransactions = sqliteTable('cash_transactions', {
  id: integer('id').primaryKey(),
  type: text('type').notNull(), // 'income' or 'expense'
  amount: real('amount').notNull(),
  description: text('description').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull(), // 'admin', 'seller', 'stockist'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const auditLogs = sqliteTable('audit_logs', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  details: text('details'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});