export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category?: 'business' | 'gaming' | 'creator' | 'student' | 'ultrabook' | 'workstation' | '2-in-1' | 'parts';
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  badge?: 'NEW' | 'HOT' | 'SALE';
  description: string;
  longDescription?: string;
  highlights?: string[];
  specs: {
    processor: string;
    ram: string;
    storage: string;
    screen: string;
    gpu?: string;
    battery?: string;
    weight?: string;
    os?: string;
    ports?: string;
    camera?: string;
  };
}

export const products: Product[] = [];

// ─── Real product images (Unsplash editorial/press-style, not AI-generated) ───
const realImages: Record<string, string[]> = {};

// Long descriptions by brand / slug pattern
const longDescriptions: Record<string, string> = {};

// Highlights by brand pattern
function generateHighlights(p: Product): string[] {
  if (p.highlights && p.highlights.length) return p.highlights;
  const h: string[] = [
    `${p.specs.processor} processor`,
    `${p.specs.ram} RAM`,
    `${p.specs.storage} fast SSD storage`,
    `${p.specs.screen} display`,
  ];
  if (p.specs.gpu) h.push(`${p.specs.gpu} graphics`);
  if (p.specs.battery) h.push(`${p.specs.battery} battery runtime`);
  if (p.specs.weight) h.push(`Lightweight at ${p.specs.weight}`);
  if (p.brand === 'Apple') h.push('macOS – full Apple ecosystem integration');
  if (p.badge === 'NEW') h.push('Latest generation model (2024/2025)');
  if (p.badge === 'SALE') h.push('Certified refurbished – tested & verified at Satya Computers');
  h.push('✓ 7-Day easy return policy');
  return h.slice(0, 6);
}

// Enrich a product with fallback data
export function enrichProduct(p: Product) {
  const category = p.category ?? ((): NonNullable<Product['category']> => {
    const n = p.name.toLowerCase();
    if (n.includes('gaming') || n.includes('rog') || n.includes('razer') || n.includes('predator') || n.includes('legion') || n.includes('nitro') || n.includes('tuf') || n.includes('loq') || n.includes('msi') || n.includes('cyborg') || n.includes('blade') || n.includes('victus') || n.includes('helios')) return 'gaming';
    if (n.includes('workstation') || n.includes('precision') || n.includes('thinkpad p')) return 'workstation';
    if (n.includes('surface pro') || n.includes('yoga') || n.includes('spectre') || n.includes('zenbook') || n.includes('swift')) return '2-in-1';
    if (n.includes('latitude') || n.includes('elitebook') || n.includes('thinkpad') || n.includes('omnibook')) return 'business';
    if (n.includes('macbook') || n.includes('xps') || n.includes('zenbook s') || n.includes('framework') || n.includes('aero')) return 'ultrabook';
    if (n.includes('ssd') || n.includes('ram') || n.includes('battery') || n.includes('nvme') || n.includes('parts')) return 'parts';
    return 'student';
  })();

  return {
    ...p,
    category,
    images: p.images?.length ? p.images : (realImages[p.slug] ?? [p.image, p.image]),
    longDescription: p.longDescription || longDescriptions[p.slug] || `The ${p.name} offers ${p.specs.processor} performance with ${p.specs.ram} RAM and ${p.specs.storage} of fast SSD storage. Its ${p.specs.screen} display delivers crisp, vibrant visuals. ${p.description} Available now at Satya Computers, Ameerpet, Hyderabad — walk in for a demo or order online.`,
    highlights: generateHighlights(p),
  };
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getRecommendedProducts(current: Product, count = 4): Product[] {
  const enriched = enrichProduct(current);
  // Same category first, then same brand, then similar price range
  const others = products.filter(p => p.slug !== current.slug);
  const sameCategory = others.filter(p => enrichProduct(p).category === enriched.category);
  const sameBrand = others.filter(p => p.brand === current.brand && enrichProduct(p).category !== enriched.category);
  const priceRange = current.price;
  const byPrice = others
    .filter(p => !sameCategory.includes(p) && !sameBrand.includes(p))
    .sort((a, b) => Math.abs(a.price - priceRange) - Math.abs(b.price - priceRange));

  return [...sameCategory, ...sameBrand, ...byPrice].slice(0, count);
}
