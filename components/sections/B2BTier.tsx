'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Globe, Truck, Calculator, ChevronRight, Check } from 'lucide-react';

export default function B2BTier() {
  const [quantity, setQuantity] = useState(1);
  const [showQuote, setShowQuote] = useState(false);

  const unitPrice = 28000;
  const discount = quantity >= 50 ? 0.20 : quantity >= 10 ? 0.12 : quantity >= 5 ? 0.08 : 0;
  const totalPrice = unitPrice * quantity * (1 - discount);

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-brand-primary)]/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/5 rounded-full mb-8">
               <Building2 size={14} className="text-[var(--color-brand-primary)]" />
               <span className="font-heading text-[10px] tracking-[0.2em] uppercase font-bold text-white/50">Enterprise Procurement</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl mb-8 leading-[0.9] tracking-tighter">
              B2B <span className="text-[var(--color-brand-primary)]">SOLUTIONS</span> FOR SCALE.
            </h2>
            
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12 max-w-lg">
              Optimized supply chain for educational institutions, corporate startups, and large-scale enterprises. Custom configurations with volume-based scaling.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Globe, title: 'PAN-INDIA DEPLOYMENT', sub: 'Hub-and-spoke logistics' },
                { icon: Truck, title: 'FAST-TRACK LOGISTICS', sub: '48hr node delivery' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 bg-[var(--color-brand-primary)]/10 flex items-center justify-center border border-[var(--color-brand-primary)]/20">
                     <item.icon size={20} className="text-[var(--color-brand-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs tracking-widest uppercase mb-1">{item.title}</h4>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-tight">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Right */}
          <div className="relative">
             <div className="bg-white text-black p-10 md:p-14 shadow-[40px_40px_0_rgba(241,90,36,0.2)] border-2 border-black relative z-10">
                <div className="flex items-center justify-between mb-10 border-b-2 border-black pb-6">
                   <h3 className="font-heading text-2xl uppercase tracking-tighter">VOLUME ESTIMATOR</h3>
                   <Calculator className="w-6 h-6 text-[var(--color-brand-primary)]" />
                </div>

                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="flex justify-between font-heading text-[11px] tracking-widest uppercase">
                        <span>UNITS REQUIRED</span>
                        <span className="text-[var(--color-brand-primary)] font-black">{quantity} SYSTEMS</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-100 appearance-none cursor-pointer accent-black"
                        aria-label="Quantity of systems"
                      />
                      <div className="flex justify-between text-[9px] text-black/40 font-bold">
                         <span>SINGLE NODE</span>
                         <span>FLEET (100+)</span>
                      </div>
                   </div>

                   <div className="bg-gray-50 p-6 border border-black/5 space-y-4">
                      <div className="flex justify-between text-xs">
                         <span className="text-black/50 font-heading">BASE VALUE</span>
                         <span className="font-body font-black">₹{(unitPrice * quantity).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-xs items-center">
                         <span className="text-black/50 font-heading">VOLUME REBATE</span>
                         <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-black">{(discount * 100).toFixed(0)}% OFF</span>
                      </div>
                      <div className="h-px bg-black/10" />
                      <div className="flex justify-between items-end">
                         <span className="font-heading text-xs uppercase tracking-widest">FINAL QUOTE</span>
                         <span className="font-body text-4xl font-black text-black">₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                   </div>

                   <button 
                    onClick={() => setShowQuote(true)}
                    className="w-full bg-black text-white py-5 font-heading text-sm tracking-widest uppercase hover:bg-[var(--color-brand-primary)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                   >
                     <span>SUBMIT FOR EVALUATION</span>
                     <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
                
                {/* Success Overlay */}
                <AnimatePresence>
                  {showQuote && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-12 text-center"
                     >
                        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20">
                           <Check size={32} />
                        </div>
                        <h4 className="font-heading text-2xl mb-4 uppercase">REQUEST LOGGED</h4>
                        <p className="font-body text-sm text-black/50 mb-10 leading-relaxed">
                          Your configuration for <strong>{quantity} units</strong> has been transmitted to our corporate desk. Reaching out within <span className="text-black font-black underline decoration-[var(--color-brand-primary)]">2 Business Hours</span>.
                        </p>
                        <button onClick={() => setShowQuote(false)} className="font-heading text-[10px] tracking-[0.3em] uppercase text-black/30 hover:text-black transition-colors underline decoration-black/10 underline-offset-4">
                          ← Back to Configurator
                        </button>
                     </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Background Brutalist Shapes */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--color-brand-primary)] -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
