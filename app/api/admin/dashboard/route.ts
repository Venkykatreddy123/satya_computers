export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { libsql as client } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || 'weekly'; // daily, weekly, monthly
    
    // Define query window based on range
    let dateLimit = '-28 days';
    let strftimeFormat = '%W';
    let labelPrefix = 'Week';

    if (range === 'daily') {
      dateLimit = '-7 days';
      strftimeFormat = '%d %b'; // e.g., 18 Mar
      labelPrefix = '';
    } else if (range === 'monthly') {
      dateLimit = '-6 months';
      strftimeFormat = '%b'; // e.g., Mar
      labelPrefix = '';
    }

    const results = await Promise.all([
      client.execute('SELECT COUNT(*) as count FROM "Product"'),
      client.execute('SELECT COUNT(*) as count FROM "Order"'),
      client.execute('SELECT COUNT(*) as count FROM "Offer"'),
      client.execute('SELECT SUM(estimatedValue) as total FROM "Order" WHERE status = \'Confirmed\''),
      client.execute('SELECT * FROM "Order" ORDER BY createdAt DESC LIMIT 5'),
      client.execute({
        sql: `
          SELECT 
            strftime(?, createdAt) as period,
            SUM(estimatedValue) as revenue,
            COUNT(*) as orders
          FROM "Order"
          WHERE createdAt >= date('now', ?)
          GROUP BY period
          ORDER BY createdAt ASC
        `,
        args: [strftimeFormat, dateLimit]
      })
    ]);

    const productCount = Number(results[0].rows[0]?.count || 0);
    const orderCount = Number(results[1].rows[0]?.count || 0);
    const offerCount = Number(results[2].rows[0]?.count || 0);
    const totalRevenue = Number(results[3].rows[0]?.total || 0);
    const recentOrders = results[4].rows;
    
    const rawData = results[5].rows;
    const chartData = rawData.map((row: any, i: number) => ({
      name: labelPrefix ? `${labelPrefix} ${i + 1}` : row.period,
      revenue: Number(row.revenue || 0),
      orders: Number(row.orders || 0)
    }));

    // Ensure we have at least some data points for the UI
    if (chartData.length === 0) {
      chartData.push({ name: 'Initial', revenue: 0, orders: 0 });
    }

    return NextResponse.json({
      stats: {
        productCount,
        orderCount,
        offerCount,
        totalRevenue
      },
      recentOrders,
      chartData
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error.message || error);
    return NextResponse.json({ error: error.message || 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
