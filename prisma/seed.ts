import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test vendor
  const vendor = await prisma.vendor.create({
    data: {
      name: 'Test Vendor',
      contact: 'John Doe',
      email: 'john@testvendor.com',
      phone: '123-456-7890',
      address: '123 Test St, Test City, TC 12345',
    },
  });

  // Create test purchase orders
  await prisma.purchaseOrder.createMany({
    data: [
      {
        poNumber: 'PO-001',
        requestor: 'Jane Smith',
        vendorId: vendor.id,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        status: 'Active',
      },
      {
        poNumber: 'PO-002',
        requestor: 'Bob Johnson',
        vendorId: vendor.id,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-11-30'),
        status: 'Pending',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 