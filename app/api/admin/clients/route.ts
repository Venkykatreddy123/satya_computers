import { NextResponse } from 'next/server';
import { libsql as client } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get unique clients based on companyName from the Order table
    const result = await client.execute(`
      SELECT 
        companyName, 
        contactPerson, 
        email, 
        phone, 
        COUNT(*) as totalOrders,
        SUM(estimatedValue) as totalValue,
        MAX(createdAt) as lastOrderDate
      FROM "Order"
      GROUP BY companyName
      ORDER BY lastOrderDate DESC
    `);
    
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Fetch clients error:', error.message || error);
    return NextResponse.json([], { status: 200 });
  }
}
