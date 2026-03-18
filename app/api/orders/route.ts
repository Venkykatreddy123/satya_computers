import { NextResponse } from 'next/server';
import { libsql as client } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      fullName, 
      email, 
      whatsapp, 
      address, 
      cartItems, 
      totalPrice,
      paymentMethod 
    } = data;

    if (!fullName || !email || !whatsapp || !address || !cartItems || !totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderId = 'SATYA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const productsString = JSON.stringify(cartItems);
    const totalUnits = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

    const result = await client.execute({
      sql: `INSERT INTO "Order" (id, orderId, companyName, contactPerson, email, phone, products, totalUnits, estimatedValue, status, notes, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [
        uuidv4(),
        orderId,
        'Individual Customer',
        fullName,
        email,
        whatsapp,
        productsString,
        totalUnits,
        totalPrice,
        'Pending',
        `[${paymentMethod || 'COD'}] ${address}`
      ],
    });

    console.log('Order created successfully:', orderId);
    
    return NextResponse.json({ orderId, success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
