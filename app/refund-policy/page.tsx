'use client';

import { storeInfo } from '@/data/store-info';
import { motion } from 'framer-motion';
import GrainOverlay from '@/components/ui/GrainOverlay';
import { ShieldAlert, CreditCard, BoxSelect, ClipboardCheck, Mail, Activity } from 'lucide-react';

const policies = [
  {
    icon: ShieldAlert,
    title: "Eligibility Period",
    content: "We provide a 7-day return window from the date of purchase. To be eligible, the item must be in its original condition, including all packaging, manuals, and accessories."
  },
  {
    icon: BoxSelect,
    title: "Restocking Fees",
    content: "Items that have been opened but are not defective may be subject to a 15% restocking fee. This ensures we can maintain our high standards of refurbishment."
  },
  {
    icon: CreditCard,
    title: "Processing Window",
    content: "Once we verify the return, your refund will be initiated via the original payment method within 7–10 business days."
  },
  {
    icon: ClipboardCheck,
    title: "Non-Returnable Items",
    content: "Software, consumables (like thermal paste or cleaning kits), and hardware showing signs of physical damage or unauthorized modifications are non-returnable."
  }
];

export default function RefundPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="min-h-screen bg-white relative pb-32">
       <GrainOverlay opacity={10} />
       
       <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/5">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="font-heading text-xs tracking-[0.4em] text-[var(--color-brand-primary)] uppercase mb-4 block font-bold">COMMITMENT & TRUST</span>
          <h1 className="font-heading text-6xl md:text-9xl text-[#1A1A1A] leading-[0.85] mb-8 uppercase">
            REFUND <br />
            <span className="text-[var(--color-brand-primary)]">POLICIES.</span>
          </h1>
          <p className="font-body text-black/50 uppercase tracking-widest text-sm">Last Revision: {lastUpdated}</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          {policies.map((p, i) => (
            <motion.div 
              key={p.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center border-[1.5px] border-black/5 text-[#1A1A1A] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all bg-black/[0.02]">
                  <p.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-3xl text-[#1A1A1A] uppercase leading-none">{p.title}</h3>
              </div>
              <p className="font-body text-sm text-black/60 leading-relaxed tracking-wider border-l-2 border-black/5 pl-6 ml-5">{p.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col justify-center bg-[#F1F1F1] p-12 border-[1px] border-black/5 h-fit text-black/70">
          <h2 className="font-heading text-4xl text-[#1A1A1A] mb-8 uppercase leading-[0.9]">Warranty <br /><span className="text-[var(--color-brand-primary)]">Assurance.</span></h2>
          <div className="prose prose-slate max-w-none font-body text-xs uppercase tracking-[0.15em] leading-[2.2]">
            <p>
              Beyond our standard refund window, every enterprise workstation includes our <strong>3-month limited hardware warranty</strong>. This covers manufacturing defects and hardware failure under normal usage conditions.
            </p>
            <p className="mt-6">
              To initiate a claim, please have your original invoice number (starting with <strong>ORD-</strong>) and a brief description of the issue. Our tech hub in Ameerpet is available for priority onsite diagnostics.
            </p>
            <div className="pt-8 mt-8 border-t border-black/10">
              <h4 className="font-heading text-xl text-black mb-3 uppercase">Contact Channel</h4>
              <p>Email: <span className="text-[var(--color-brand-primary)]">support@satyacomputers.topiko.com</span></p>
              <p>Phone: +91 {storeInfo.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
