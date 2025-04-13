import { eq, like, sql } from 'drizzle-orm'
import { db } from '../drizzle'
import { IProductInsert, products } from '../schemas/products'
import { categories, suppliers } from '../schemas'

class ProductsService {
  async create(data: IProductInsert) {
    const product = await db.insert(products).values(data).returning()
    return product[0]
  }

  async update(id: string, data: Partial<IProductInsert>) {
    const updated = await db.update(products).set(data).where(eq(products.id, id)).returning()
    return updated[0]
  }

  async getAll(page = 1, pageSize = 10, name?: string) {
    try {
      const whereClause = name ? like(products.name, `%${name}%`) : undefined
      const [productsList, count] = await Promise.all([
        db
          .select({
            id: products.id,
            name: products.name,
            size: products.size,
            color: products.color,
            quantity: products.quantity,
            price: products.price,
            createdAt: products.createdAt,
            categoryName: categories.name,
            supplierName: suppliers.name
          })
          .from(products)
          .leftJoin(categories, eq(products.categoryId, categories.id))
          .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
          .where(whereClause)
          .offset((page - 1) * pageSize)
          .limit(pageSize),
        db
          .select({
            count: sql<number>`cast(count(${products.id}) as integer)`
          })
          .from(products)
          .where(whereClause)
      ])

      return {
        data: productsList,
        totalItems: count[0].count
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      throw new Error('Error fetching products')
    }
  }

  async getById(id: string) {
    const product = await db.select().from(products).where(eq(products.id, id))
    return product[0]
  }

  async delete(id: string) {
    const deleted = await db.delete(products).where(eq(products.id, id)).returning()
    return deleted[0]
  }
}

export const productService = new ProductsService()
