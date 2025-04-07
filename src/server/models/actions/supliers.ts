import { eq, like, sql } from 'drizzle-orm'

import { db } from '../drizzle'
import { suppliers } from '../schemas'

class SupplierService {
  async createSupplier({ address, email, name, phone, notes }: typeof suppliers.$inferInsert) {
    try {
      const newSupplier = await db
        .insert(suppliers)
        .values({
          name,
          address,
          phone,
          notes,
          email
        })
        .returning()
      return newSupplier[0]
    } catch (error) {
      console.error('Error creating supplier:', error)
      throw new Error('Error creating supplier')
    }
  }

  async getAllSuppliers(page = 1, pageSize = 10, name?: string) {
    try {
      const whereOptions = name ? like(suppliers.name, `%${name}%`) : undefined

      const [suppliersList, count] = await Promise.all([
        db
          .select()
          .from(suppliers)
          .where(whereOptions)
          .offset((page - 1) * pageSize)
          .limit(pageSize),
        db
          .select({
            count: sql<number>`cast(count(${suppliers.id}) as integer)`
          })
          .from(suppliers)
          .where(whereOptions)
      ])

      return {
        suppliers: suppliersList,
        totalItems: count[0].count
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      throw new Error('Error fetching suppliers')
    }
  }

  async getSupplierById(id: string) {
    try {
      const supplierData = await db.select().from(suppliers).where(eq(suppliers.id, id)).limit(1)
      return supplierData[0]
    } catch (error) {
      console.error('Error fetching supplier by ID:', error)
      throw new Error('Error fetching supplier by ID')
    }
  }

  async updateSupplier(
    id: string,
    name?: string,
    address?: string,
    phone?: string,
    notes?: string
  ) {
    try {
      const updatedSupplier = await db
        .update(suppliers)
        .set({ name, address, phone, notes })
        .where(eq(suppliers.id, id))
        .returning()
      return updatedSupplier[0]
    } catch (error) {
      console.error('Error updating supplier:', error)
      throw new Error('Error updating supplier')
    }
  }

  async deleteSupplier(id: string) {
    try {
      const deletedSupplier = await db
        .delete(suppliers)
        .where(eq(suppliers.id, id.toString()))
        .returning()
      return deletedSupplier[0]
    } catch (error) {
      console.error('Error deleting supplier:', error)
      throw new Error('Error deleting supplier')
    }
  }
}

export const supplierService = new SupplierService()
