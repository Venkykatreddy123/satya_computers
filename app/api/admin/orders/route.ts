export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { libsql as client } from '@/lib/prisma';

export async function GET() {
  try {
    const result = await client.execute('SELECT * FROM "Order" ORDER BY createdAt DESC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Fetch orders error:', error.message || error);
    return NextResponse.json([], { status: 200 });
  }
}
