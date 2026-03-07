import GrainOverlay from '@/components/ui/GrainOverlay';

import ProductsClientPage from '@/components/store/ProductsClientPage';
import { getAllProducts } from '@/data/products';

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-white relative pb-24">
      <GrainOverlay opacity={10} />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-b border-black/10">

        <h1 className="font-heading text-6xl md:text-8xl text-brand-text tracking-tight mb-4 lowercase">
          ALL <span className="text-[var(--color-brand-primary)]">WORKSTATIONS</span>
        </h1>
        <p className="font-body text-xl text-brand-text-muted max-w-2xl">
          Browse our curated selection of high-performance refurbished laptops. Uncompromising quality at unbeatable prices.
        </p>
      </section>

      {/* Search + Filters + Grid (Client Component) */}
      <ProductsClientPage products={products} />
    </main>
  );
}
