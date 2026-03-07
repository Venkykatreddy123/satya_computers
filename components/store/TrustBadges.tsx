'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, X } from 'lucide-react';

const policies = [
  {
    id: 'delivery',
    icon: Truck,
    title: 'Free delivery in Hyderabad',
    subtitle: 'Same day shipping',
    content: "Enjoy complimentary, lightning-fast delivery within Hyderabad limits. All systems are securely packaged in shock-proof, anti-static materials. Orders placed before 2 PM are guaranteed to be delivered the very same day. For orders outside Hyderabad, standard shipping rates apply with 3-5 days delivery.",
    color: 'var(--color-brand-primary)'
  },
  {
    id: 'returns',
    icon: RotateCcw,
    title: '7-day easy returns',
    subtitle: 'Hassle-free policy',
    content: "Your satisfaction is our priority. If you encounter any technical issues or if the product doesn't meet the described specifications, you can return it within 7 days. We offer instant replacements or a full refund for defective units. The device must be in its original refurbished condition.",
    color: '#000000'
  },
  {
    id: 'warranty',
    icon: ShieldCheck,
    title: '6-month warranty',
    subtitle: 'Full hardware cover',
    content: "Every system sold by Satya Computers comes with a comprehensive 6-month warranty. This covers all internal hardware including the motherboard, RAM, storage drive, and display. You can claim your warranty directly at our Ameerpet store for immediate resolution, or reach out via our priority WhatsApp support line.",
    color: '#000000'
  }
];

export default function TrustBadges() {
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const activeData = policies.find(p => p.id === activePolicy);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {policies.map((policy) => {
          const Icon = policy.icon;
          return (
            <motion.button
              key={policy.id}
              onClick={() => setActivePolicy(policy.id)}
              whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ y: 0 }}
              className="relative group bg-white border border-black/10 p-5 flex flex-col items-center text-center overflow-hidden transition-colors hover:border-[var(--color-brand-primary)]"
            >
              {/* Animated Background Reveal */}
              <div className="absolute inset-0 bg-[#F9F9F7] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />
              
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-12 h-12 bg-[#F0F0EE] group-hover:bg-white rounded-full flex items-center justify-center mb-4 transition-colors duration-500 border border-black/5">
                  <Icon className="w-5 h-5 text-brand-text group-hover:text-[var(--color-brand-primary)] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <span className="font-heading text-xs tracking-widest text-[#222] mb-1 uppercase">
                  {policy.title}
                </span>
                
                <span className="font-body text-[11px] text-brand-text/50 group-hover:text-brand-text/80 transition-colors">
                  {policy.subtitle}
                </span>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-heading tracking-widest text-[var(--color-brand-primary)] border-b border-[var(--color-brand-primary)]/30 pb-0.5">
                    READ DETAILS &rarr;
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activePolicy && activeData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePolicy(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white w-full max-w-md shadow-2xl pointer-events-auto overflow-hidden relative"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActivePolicy(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-[#F7F7F5] hover:bg-black hover:text-white transition-colors duration-300 rounded-full"
                  aria-label="Close modal"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header Pattern */}
                <div className="h-24 bg-[#F9F9F7] border-b border-black/5 relative overflow-hidden flex items-end px-8 pb-6">
                   <div className="absolute -top-12 -right-12 text-[var(--color-brand-primary)] opacity-5 rotate-12">
                      <activeData.icon className="w-48 h-48" strokeWidth={1} />
                   </div>
                   <div className="w-12 h-12 bg-white border border-black/10 rounded-full flex items-center justify-center relative shadow-sm">
                      <activeData.icon className="w-5 h-5 text-[var(--color-brand-primary)]" strokeWidth={1.5} />
                   </div>
                </div>

                <div className="p-8 pt-6">
                  <h3 className="font-heading text-xl text-brand-text uppercase mb-2">
                    {activeData.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-[var(--color-brand-primary)] mb-6" />
                  
                  <p className="font-body text-sm text-brand-text/80 leading-relaxed mb-8">
                    {activeData.content}
                  </p>

                  <button 
                    onClick={() => setActivePolicy(null)}
                    className="w-full py-4 text-xs font-heading tracking-widest text-center border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                  >
                    UNDERSTOOD / CLOSE
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
