import 'dotenv/config';
import prisma from './lib/prisma.ts';


async function main() {
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  const offerCount = await prisma.offer.count();
  console.log(JSON.stringify({ productCount, orderCount, offerCount }));
}

main();
