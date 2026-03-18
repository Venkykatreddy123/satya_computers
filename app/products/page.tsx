import GrainOverlay from '@/components/ui/GrainOverlay';
import ProductsClientPage from '@/components/store/ProductsClientPage';
import { getAllProducts, Product } from '@/data/products';
import { libsql as client } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // 1. Get static products
  const staticProducts = getAllProducts();

  // 2. Get DB products
  let dbProducts: Product[] = [];
  try {
    const result = await client.execute('SELECT * FROM "Product" ORDER BY createdAt DESC');
    dbProducts = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.id, // Use ID as slug for DB products
      brand: row.brand,
      category: row.category,
      price: row.price,
      originalPrice: row.price * 1.2, // Mock original price
      image: row.image || '/products/dell_laptop_premium.png',
      description: row.description || 'Professional workstation optimized for enterprise performance.',
      badge: row.isFeatured ? 'NEW' : undefined,
      specs: {
        processor: row.processor || 'Intel Core i5',
        ram: row.ram || '8GB',
        storage: row.storage || '256GB SSD',
        screen: row.display || '14" FHD'
      }
    }));
  } catch (error) {
    console.error('Failed to fetch DB products:', error);
  }

  // 3. Merge products (avoid duplicates)
  const allProducts = [...dbProducts, ...staticProducts];

  return (
    <main className="min-h-screen bg-white relative">
      <GrainOverlay opacity={10} />


      {/* Search + Filters + Grid (Client Component) */}
      <ProductsClientPage products={allProducts} />
    </main>
  );
}
