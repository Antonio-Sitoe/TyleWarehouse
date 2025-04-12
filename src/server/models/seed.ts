import { costumer, suppliers, products } from './schemas'
import { createId } from '@paralleldrive/cuid2'
import { db } from './drizzle'
import { categories } from './schemas/category'

async function seed() {
  console.log('🌱 Starting seed...')

  // Remove existing data (opcional em dev)
  await db.delete(products)
  await db.delete(costumer)
  await db.delete(suppliers)
  await db.delete(categories)

  console.log('🧹 Cleared existing data.')

  // Insert suppliers
  const suppliersData = [
    {
      id: createId(),
      name: 'Fornecedor A',
      email: 'contato@fornecedora.com',
      phone: '+244 999-111-222',
      address: 'Rua das Tijoleiras, Luanda',
      notes: 'Fornecedor preferencial',
      createdAt: new Date().toISOString()
    },
    {
      id: createId(),
      name: 'Fornecedor B',
      email: 'comercial@fornecedorb.com',
      phone: '+244 922-333-444',
      address: 'Avenida Principal, Benguela',
      notes: '',
      createdAt: new Date().toISOString()
    }
  ]

  await db.insert(suppliers).values(suppliersData)
  console.log('✅ Suppliers inserted.')

  // Insert costumers
  const costumersData = [
    {
      id: createId(),
      name: 'João Manuel',
      phone: '+244 911-555-123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: createId(),
      name: 'Maria José',
      phone: '+244 923-111-789',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  await db.insert(costumer).values(costumersData)
  console.log('✅ Costumers inserted.')

  // const categoriesData: typeof categories.$inferInsert = {
  //   id: createId(),
  //   name: 'Ceramica',
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString()
  // }

  // await db.insert(categories).values(categoriesData)
  // console.log('✅ Categories inserted.')
  // // Insert products (relacionado ao primeiro fornecedor)
  // const productsData: (typeof products.$inferInsert)[] = [
  //   {
  //     id: createId(),
  //     name: 'Caixa Cerâmica 20x20',
  //     color: 'Branco',
  //     size: '20x20',
  //     quantity: 100,
  //     price: 300,
  //     supplierId: suppliersData[0].id,
  //     createdAt: new Date().toISOString(),
  //     categoryId: categoriesData.id
  //   }
  //   // {
  //   //   id: createId(),
  //   //   name: 'Caixa Porcelanato 60x60',
  //   //   price: 200,
  //   //   color: 'Cinza',
  //   //   size: '60x60',
  //   //   categoryId: categoriesData.id,
  //   //   quantity: 50,
  //   //   supplierId: suppliersData[1].id,
  //   //   createdAt: new Date().toISOString()
  //   // }
  // ]

  // await db.insert(products).values(productsData)
  // console.log('✅ Products inserted.')

  console.log('🎉 Seed completed successfully!')
}

seed().catch((err) => {
  console.error('❌ Error during seed:', err)
})
