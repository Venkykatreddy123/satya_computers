'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/data/products';
import { useCart } from '@/lib/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const isBrandColorBadge = product.badge === 'HOT' || product.badge === 'SALE';

  return (
    <motion.div 
      className="group relative flex flex-col h-full bg-white border-2 border-black/5 cursor-pointer overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Dynamic Border Effect (Using Logo Color) */}
      <motion.div 
        className="absolute inset-0 border-2 border-[var(--color-brand-primary)] opacity-0 z-50 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden z-20">
         <motion.div 
           className="w-16 h-16 bg-[var(--color-brand-primary)] absolute -top-8 -right-8 origin-center rotate-45"
           animate={{ scale: hovered ? 1.5 : 1 }}
           transition={{ duration: 0.4 }}
         />
      </div>

      {/* Top Bar - Identity */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-[#FAFAFA] relative z-10">
        <span className="font-heading text-[10px] tracking-[0.25em] text-black/40 uppercase font-bold">SYS: {product.brand.slice(0, 4)}.{product.id.slice(-4)}</span>
        <div className="flex items-center gap-1.5 font-heading text-[10px] tracking-widest text-[var(--color-brand-primary)] font-bold">
          <motion.div 
             animate={{ opacity: [1, 0, 1] }} 
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="w-1.5 h-1.5 bg-[var(--color-brand-primary)] rounded-full"
          />
          <span>ACTIVE</span>
        </div>
      </div>

      {/* Image Area - Technical Viewport */}
      <div className="relative aspect-[4/3] w-full bg-[#f4f4f4] overflow-hidden p-6">
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] mix-blend-multiply" />
        
        {/* Animated Scanline Background using Logo Color */}
        <motion.div 
           className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[var(--color-brand-primary)]/10 to-transparent blur-md"
           animate={{ y: hovered ? ['-100%', '300%'] : '-100%' }}
           transition={{ duration: 1.5, repeat: hovered ? Infinity : 0, ease: "linear" }}
        />
        
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className={`inline-block px-3 py-1 font-heading text-[11px] tracking-[0.25em] text-white font-bold shadow-lg ${
              isBrandColorBadge ? 'bg-[var(--color-brand-primary)]' : 'bg-black'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* 3D Image Container with Framer Motion */}
        <motion.div 
          className="relative w-full h-full z-10"
          animate={{ 
            scale: hovered ? 1.05 : 1,
            rotateZ: hovered ? -2 : 0,
            y: hovered ? -10 : 0
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Dynamic Shadow */}
          <motion.div 
            className="absolute inset-x-8 -bottom-4 h-6 bg-black/30 blur-xl rounded-[100%]"
            animate={{ 
              opacity: hovered ? 0.6 : 0.2,
              scale: hovered ? 0.8 : 1,
              y: hovered ? 20 : 0
            }}
          />
          
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain mix-blend-multiply filter drop-shadow-xl" 
          />
        </motion.div>
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col flex-grow p-6 pt-5 bg-white relative z-10">
        
        {/* Animated Accent Line */}
        <motion.div 
          className="h-1 bg-[var(--color-brand-primary)] mb-5 origin-left"
          initial={{ scaleX: 0.1 }}
          animate={{ scaleX: hovered ? 1 : 0.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="flex-grow mb-6">
          <h3 className="font-heading text-2xl text-brand-text leading-[1.1] uppercase font-black tracking-tight mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <p className="font-body text-xs text-brand-text-muted/60 mb-5 line-clamp-2 leading-relaxed italic">
            {product.description}
          </p>
          
          {/* Tech Specs */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 border-t border-black/5 pt-5">
            {[
              { label: 'CPU', value: product.specs.processor },
              { label: 'RAM', value: product.specs.ram },
              { label: 'SSD', value: product.specs.storage },
              { label: 'DISPLAY', value: product.specs.screen }
            ].map((spec, i) => (
              <motion.div 
                 key={spec.label} 
                 className="space-y-1 relative pl-3"
                 initial={{ x: -5, opacity: 0.8 }}
                 animate={{ x: hovered ? 0 : -5, opacity: 1 }}
                 transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10 group-hover:bg-[var(--color-brand-primary)]/50 transition-colors duration-300" />
                <span className="block font-heading text-[9px] tracking-[0.3em] text-black/40 uppercase font-bold">{spec.label}</span>
                <span className="block font-body text-[11px] font-bold text-brand-text truncate">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-end justify-between mt-auto border-t-[3px] border-black/5 pt-5 group-hover:border-[var(--color-brand-primary)]/20 transition-colors duration-300">
          <div className="flex flex-col">
            <span className="font-heading text-[9px] tracking-[0.3em] text-black/40 uppercase font-bold mb-1">DATA :: PRICE</span>
            <div className="flex items-baseline gap-2">
              <span className="font-body text-xl font-black text-brand-text tracking-tighter">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="font-body text-xs text-brand-text-muted/40 line-through font-bold">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>
          
          <motion.button 
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className={`relative h-12 px-6 font-heading text-[11px] tracking-[0.25em] font-bold overflow-hidden outline-none ${
              added 
              ? 'bg-green-500 text-white' 
              : 'bg-black text-white hover:bg-[var(--color-brand-primary)]'
            } transition-colors duration-300`}
          >
            <AnimatePresence mode="popLayout">
              {added ? (
                <motion.span 
                  key="added"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  SYSTEM MOUNTED ✓
                </motion.span>
              ) : (
                <motion.span 
                  key="add"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  INITIALIZE 
                  <span className="text-[var(--color-brand-primary)] group-hover:text-white transition-colors duration-300">→</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
