import { eq, like, sql } from 'drizzle-orm'
import { ICategory } from '../../../shared/zod/categories-schema'
import { db } from '../drizzle'
import { categories } from '../schemas'

export class CategoryService {
  async create({ name }: ICategory) {
    const category = await db
      .insert(categories)
      .values({
        name
      })
      .returning()
    return category[0]
  }

  async update({ name, id }: Pick<ICategory, 'name'> & { id: string }) {
    const category = await db
      .update(categories)
      .set({ name })
      .where(eq(categories.id, id))
      .returning()
    return category[0]
  }

  async getAll(page = 1, pageSize = 10, name?: string) {
    const whereOptions = name ? like(categories.name, `%${name}%`) : undefined
    const [list, count] = await Promise.all([
      db
        .select()
        .from(categories)
        .where(whereOptions)
        .offset((page - 1) * pageSize)
        .limit(pageSize),

      db
        .select({
          count: sql<number>`cast(count(${categories.id}) as integer)`
        })
        .from(categories)
        .where(whereOptions)
    ])

    return {
      data: list,
      totalItems: count[0].count
    }
  }

  async getById(id: string) {
    const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1)
    return result[0]
  }

  async delete(id: string) {
    const deleted = await db.delete(categories).where(eq(categories.id, id)).returning()
    return deleted[0]
  }
}

export const categoriesService = new CategoryService()
