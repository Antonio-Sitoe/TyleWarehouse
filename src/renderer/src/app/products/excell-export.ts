import { IProduct } from '@shared/zod/product-schema'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export async function exportProducts(data: IProduct[]) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Produtos')

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Nome', key: 'name', width: 32 },
    { header: 'Categoria', key: 'categoryName', width: 32 },
    { header: 'Tamanho', key: 'size', width: 32 },
    { header: 'Quantidade', key: 'quantity', width: 32 },
    { header: 'Preço', key: 'price', width: 32 },
    { header: 'Fornecedor', key: 'supplierName', width: 32 }
  ]
  data.forEach((product) => {
    worksheet.addRow({
      id: product.id,
      name: product.name,
      categoryName: product.categoryName,
      size: product.size,
      quantity: product.quantity,
      price: product.price,
      supplierName: product.supplierName
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  saveAs(blob, 'produtos.xlsx')
}
