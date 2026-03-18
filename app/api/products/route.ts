import { NextResponse } from 'next/server';
import { libsql as client } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, brand, price, description, processor, ram, storage, 
      display, bulkPrice5_10, bulkPrice11_25, bulkPrice26Plus, 
      stockStatus, isFeatured, minOrderQty, image 
    } = body;

    if (!name || !brand || !price) {
      return NextResponse.json({ error: 'Name, brand and price are required' }, { status: 400 });
    }

    const id = Math.random().toString(36).substring(2, 11);
    
    await client.execute({
      sql: `INSERT INTO "Product" (
        id, name, brand, processor, ram, storage, display, price, 
        bulkPrice5_10, bulkPrice11_25, bulkPrice26Plus, minOrderQty, 
        stockStatus, description, isFeatured, image, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: [
        id, name, brand, processor || '', ram || '', storage || '', display || '', 
        parseFloat(price), 
        bulkPrice5_10 ? parseFloat(bulkPrice5_10) : null,
        bulkPrice11_25 ? parseFloat(bulkPrice11_25) : null,
        bulkPrice26Plus ? parseFloat(bulkPrice26Plus) : null,
        parseInt(minOrderQty || 1),
        stockStatus || 'In Stock',
        description || '',
        isFeatured ? 1 : 0,
        image || ''
      ]
    });

    return NextResponse.json({ message: 'Product added successfully', id });
  } catch (error: any) {
    console.error('Add product error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
