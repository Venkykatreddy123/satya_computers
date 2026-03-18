const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orderId = 'SATYA-ENgNH6GFF';
  
  const existing = await prisma.order.findUnique({
    where: { orderId }
  });

  if (!existing) {
    await prisma.order.create({
      data: {
        orderId: orderId,
        companyName: 'Satya Enterprise Labs',
        contactPerson: 'Venkatesh',
        email: 'venky@example.com',
        phone: '918309178589',
        products: 'Workstation Setup x5',
        totalUnits: 5,
        estimatedValue: 140000,
        status: 'Processing',
        notes: 'Priority deployment for testing'
      }
    });
    console.log(`Created test order ${orderId}`);
  } else {
    console.log(`Order ${orderId} already exists`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
