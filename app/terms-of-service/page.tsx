'use client';

import { storeInfo } from '@/data/store-info';
import { motion } from 'framer-motion';
import GrainOverlay from '@/components/ui/GrainOverlay';
import { Scale, FileText, AlertTriangle, CheckSquare, MessageSquare, Handshake, Mail } from 'lucide-react';

const terms = [
  {
    icon: Scale,
    title: "Acceptance of Protocol",
    content: "By accessing this architecture, you agree to be bound by these Terms of Service and all applicable laws and regulations in the jurisdiction of Telangana, India."
  },
  {
    icon: AlertTriangle,
    title: "Usage & Accuracy",
    content: "While we strive for absolute precision, Satya Computers does not warrant that product descriptions or other site architectural content are error-free or complete."
  },
  {
    icon: Handshake,
    title: "Commercial Engagement",
    content: "All orders placed are subject to availability and credit verification. We reserve the right to decline any order at our sole discretion."
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    content: "The aesthetic, code, and brand identifiers are the property of Satya Computers. Unauthorized reproduction of this digital architecture is prohibited."
  }
];

export default function TermsOfServicePage() {
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
          <span className="font-heading text-xs tracking-[0.4em] text-[var(--color-brand-primary)] uppercase mb-4 block font-bold">GOVERNANCE & STANDARDS</span>
          <h1 className="font-heading text-6xl md:text-9xl text-[#1A1A1A] leading-[0.85] mb-8 uppercase">
            TERMS OF <br />
            <span className="text-[var(--color-brand-primary)]">SERVICE.</span>
          </h1>
          <p className="font-body text-black/50 uppercase tracking-widest text-sm">Last Revision: {lastUpdated}</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {terms.map((t, i) => (
            <motion.div 
              key={t.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-[#1A1A1A] text-white">
                  <t.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-4xl text-[#1A1A1A] uppercase leading-none">{t.title}</h3>
              </div>
              <p className="font-body text-base text-black/60 leading-relaxed tracking-wider pl-18 max-w-2xl">{t.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#000] text-white p-12 h-fit border-[1px] border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 hero-dot-grid opacity-10 invert" />
          <div className="relative z-10">
            <h2 className="font-heading text-4xl mb-8 uppercase leading-[0.9]">Legal <br /><span className="text-[var(--color-brand-primary)]">Support.</span></h2>
            <div className="prose prose-invert max-w-none font-body text-xs uppercase tracking-[0.1em] leading-[2.4] text-white/50">
              <p>
                For detailed legal inquiries or clarifications regarding our commercial protocol, please connect with our administrative team.
              </p>
              <div className="pt-8 mt-8 border-t border-white/10">
                <h4 className="font-heading text-xl text-white mb-4 uppercase">Queries Channel</h4>
                <div className="flex items-center gap-3 text-white/80 hover:text-[var(--color-brand-primary)] transition-colors mb-2">
                  <Mail size={14} />
                  <span>legal@satyacomputers.topiko.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 hover:text-[var(--color-brand-primary)] transition-colors">
                  <MessageSquare size={14} />
                  <span>+91 {storeInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
