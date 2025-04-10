import { eq, like, sql } from 'drizzle-orm'
import { db } from '../drizzle'
import { costumer } from '../schemas'

class CostumerService {
  async create({ name, phone }: typeof costumer.$inferInsert) {
    const costumerCreated = await db.insert(costumer).values({ name, phone }).returning()
    return costumerCreated[0]
  }

  async update(id: string, data: Partial<typeof costumer.$inferInsert>) {
    const costumerUpdated = await db
      .update(costumer)
      .set({
        ...data,
        updatedAt: new Date().toISOString()
      })
      .where(eq(costumer.id, id))
      .returning()
    return costumerUpdated[0]
  }

  async getAll(page = 1, pageSize = 10, name?: string) {
    const whereOptions = name ? like(costumer.name, `%${name}%`) : undefined

    const [list, count] = await Promise.all([
      db
        .select()
        .from(costumer)
        .where(whereOptions)
        .offset((page - 1) * pageSize)
        .limit(pageSize),

      db
        .select({
          count: sql<number>`cast(count(${costumer.id}) as integer)`
        })
        .from(costumer)
        .where(whereOptions)
    ])

    return {
      costumers: list,
      totalItems: count[0].count
    }
  }

  async getById(id: string) {
    const result = await db.select().from(costumer).where(eq(costumer.id, id)).limit(1)
    return result[0]
  }

  async delete(id: string) {
    const deleted = await db.delete(costumer).where(eq(costumer.id, id)).returning()
    return deleted[0]
  }
}

export const costumerService = new CostumerService()
