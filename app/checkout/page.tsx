'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import BrutalButton from '@/components/ui/BrutalButton';
import GrainOverlay from '@/components/ui/GrainOverlay';


export default function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      const orderId = 'SATYA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      router.push(`/order-status?id=${orderId}`);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-brand-bg relative pb-24">
      <GrainOverlay opacity={30} />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-b border-white/10">

        <h1 className="font-heading text-6xl md:text-8xl text-brand-text tracking-tight mb-4">
          SECURE <span className="text-[var(--color-gold)]">CHECKOUT</span>
        </h1>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Checkout Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} suppressHydrationWarning className="bg-white border border-black/10 p-8 flex flex-col gap-8">
            <div>
              <h3 className="font-heading text-2xl text-brand-text mb-6 tracking-widest">CONTACT INFO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-brand-text">
                <div>
                  <label htmlFor="fullName" className="block text-sm text-brand-text/60 mb-2">Full Name</label>
                  <input id="fullName" suppressHydrationWarning required className="w-full bg-transparent border border-black/20 p-3 focus:outline-none focus:border-[var(--color-gold)] text-brand-text" type="text" />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm text-brand-text/60 mb-2">WhatsApp Number</label>
                  <input id="whatsapp" suppressHydrationWarning required className="w-full bg-transparent border border-black/20 p-3 focus:outline-none focus:border-[var(--color-gold)] text-brand-text" type="tel" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm text-brand-text/60 mb-2">Email Address</label>
                  <input id="email" suppressHydrationWarning required className="w-full bg-transparent border border-black/20 p-3 focus:outline-none focus:border-[var(--color-gold)] text-brand-text" type="email" />
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h3 className="font-heading text-2xl text-brand-text mb-6 tracking-widest">SHIPPING ADDRESS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-brand-text">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="block text-sm text-brand-text/60 mb-2">Street Address</label>
                  <input id="street" suppressHydrationWarning required className="w-full bg-transparent border border-black/20 p-3 focus:outline-none focus:border-[var(--color-gold)] text-brand-text" type="text" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm text-brand-text/60 mb-2">City</label>
                  <input id="city" suppressHydrationWarning required className="w-full bg-transparent border border-black/20 p-3 focus:outline-none focus:border-[var(--color-gold)] text-brand-text" type="text" />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm text-brand-text/60 mb-2">Pincode</label>
                  <input id="pincode" suppressHydrationWarning required className="w-full bg-transparent border border-black/20 p-3 focus:outline-none focus:border-[var(--color-gold)] text-brand-text" type="text" />
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h3 className="font-heading text-2xl text-brand-text mb-6 tracking-widest">PAYMENT METHOD</h3>
              <div className="font-body text-brand-text/80 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="accent-[var(--color-gold)] w-4 h-4" />
                  Cash on Delivery (COD)
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="accent-[var(--color-gold)] w-4 h-4" />
                  UPI / Wallet (Confirm via WhatsApp)
                </label>
              </div>
            </div>

            <div className="mt-8">
              <BrutalButton type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
              </BrutalButton>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-black/10 p-8 sticky top-28">
            <h3 className="font-heading text-xl mb-6 tracking-widest text-brand-text border-b border-black/10 pb-4">YOUR ORDER</h3>
            
            <div className="space-y-4 font-body text-brand-text/80 mb-8 border-b border-black/10 pb-8">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-4">
              <span className="font-heading text-xl text-[var(--color-brand-primary)] tracking-widest">TO PAY</span>
              <span className="font-body text-4xl text-brand-text">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
