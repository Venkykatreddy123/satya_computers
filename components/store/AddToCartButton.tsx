'use client';

import { useCart } from '@/lib/CartContext';
import BrutalButton from '@/components/ui/BrutalButton';
import { Product } from '@/data/products';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full md:w-auto">
      <BrutalButton 
        onClick={handleAdd} 
        className={`w-full ${added ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' : ''}`}
      >
        {added ? 'ADDED TO CART ✓' : 'ADD TO CART'}
      </BrutalButton>
    </div>
  );
}
