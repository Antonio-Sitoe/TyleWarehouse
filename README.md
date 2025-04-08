# 📦 TyleWarehouse

**TyleWarehouse** is a desktop application designed to simplify and digitize stock management for warehouses that sell ceramic tiles. Built with modern technologies, the system offers offline-first support, real-time synchronization, and an intuitive interface tailored for operational efficiency.

## 🛠️ Technologies Used

- **Frontend/UI**: React.js + TypeScript
- **Backend**: Node.js + Drizzle ORM
- **Desktop App**: Electron.js
- **Local Database**: SQLite
- **Cloud Database**: PostgreSQL (via backend sync)

## 🔑 Key Features

- **Product Management**: Register, edit, and organize ceramic tile products by category, size, and color.
- **Supplier Control**: Manage supplier data and associate them with specific products.
- **Client Management**: Keep track of client details and purchase history.
- **Stock Control**: Log product entries and exits, monitor quantities in real-time.
- **Sales System**: Create and manage sales orders, apply discounts, and generate invoices.
- **Cash Register**: Register financial transactions and monitor cash flow.
- **Reports & Dashboards**: Generate visual reports for inventory, sales, and finance.
- **User Roles**: Secure access with role-based permissions (Admin, Seller, Stock Manager).
- **Audit Trail**: Full history of operations for transparency and traceability.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/antonio-sitoe/TyleWarehouse.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app in development:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 📂 Folder Structure (Example)

```
/src
  /components
  /pages
  /services
  /database
  /electron
```

## 📄 License

This project is licensed under the MIT License.
