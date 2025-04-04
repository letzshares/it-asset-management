# IT Asset Management System

A web-based IT Asset Management system built with Next.js, Prisma, and Material-UI.

## Features

- Asset Management
- History Tracking
- Software Management
- Vendor Management
- PO Tracking
- License Renewals
- ID Code Management
- Bulk Upload/Update
- Admin Panel

## Prerequisites

- Node.js 18.x or later
- PostgreSQL 12.x or later
- npm or yarn

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/it-asset-management.git
   cd it-asset-management
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/it_asset_management"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at http://localhost:3000

## Database Schema

The system uses the following main tables:
- Assets
- AssetHistory
- Software
- Vendors
- PurchaseOrders
- LicenseRenewals
- IdCodes
- Users

## API Endpoints

- `/api/assets` - Asset management
- `/api/history` - History tracking
- `/api/software` - Software management
- `/api/vendors` - Vendor management
- `/api/po-tracking` - Purchase order tracking
- `/api/renewals` - License renewals
- `/api/id-codes` - ID code management
- `/api/upload` - Bulk upload
- `/api/update` - Bulk update
- `/api/admin` - Admin functions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
