'use client';

import { storeInfo } from '@/data/store-info';
import { motion } from 'framer-motion';
import GrainOverlay from '@/components/ui/GrainOverlay';
import { ShieldCheck, Lock, UserCheck, Search, Database, Mail } from 'lucide-react';

const policies = [
  {
    icon: ShieldCheck,
    title: "Data Sovereignty",
    content: "At Satya Computers, your data privacy is our absolute priority. We collect only what's necessary for order fulfillment and never share your internal data with third-party marketers."
  },
  {
    icon: Lock,
    title: "Security & Encryption",
    content: "We utilize industry-standard SSL encryption and high-level hashing (bcryptjs) for user credentials. Your transactions are guarded by established financial gateways."
  },
  {
    icon: Database,
    title: "Storage Policy",
    content: "Local storage and cookies are used exclusively for session management and cart persistence. We don't track your cross-site behavior for advertising purposes."
  },
  {
    icon: UserCheck,
    title: "User Rights",
    content: "You retain full access to your account data. At any point, you may request complete deletion of your records from our servers."
  }
];

export default function PrivacyPolicyPage() {
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
          <span className="font-heading text-xs tracking-[0.4em] text-[var(--color-brand-primary)] uppercase mb-4 block font-bold">LEGALEASE & TRUST</span>
          <h1 className="font-heading text-6xl md:text-9xl text-[#1A1A1A] leading-[0.85] mb-8 uppercase">
            PRIVACY <br />
            <span className="text-[var(--color-brand-primary)]">PROTOCOL.</span>
          </h1>
          <p className="font-body text-black/50 uppercase tracking-widest text-sm">Last Revision: {lastUpdated}</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-4xl text-[#1A1A1A] mb-8 uppercase tracking-tight">Introduction</h2>
              <p className="font-body text-black/60 leading-relaxed text-lg italic border-l-4 border-black pl-6">
                "Our business is built on trust. We believe that transparency in how we handle your information is the foundation of a long-term professional relationship."
              </p>
            </div>

            <div className="space-y-10">
              {policies.map((p, i) => (
                <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-black text-white">
                      <p.icon size={16} />
                    </div>
                    <h3 className="font-heading text-2xl text-[#1A1A1A] uppercase">{p.title}</h3>
                  </div>
                  <p className="font-body text-sm text-black/60 leading-relaxed tracking-wider">{p.content}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-[#F9F9F9] p-12 border-[1px] border-black/5 h-fit sticky top-32">
            <h2 className="font-heading text-4xl text-[#1A1A1A] mb-8 uppercase tracking-tight">Governance</h2>
            <div className="space-y-8 prose prose-slate max-w-none font-body text-xs text-black/50 uppercase tracking-[0.15em] leading-[2]">
              <p>
                This policy applies to all domains and services operated by Satya Computers. By utilizing our architecture, you acknowledge the terms outlined in this protocol.
              </p>
              <h4 className="font-heading text-lg text-black mb-2 uppercase">Third-Party Affiliates</h4>
              <p>
                We integrate with Google Analytics for performance monitoring and Turso (LibSQL) for database operations. These partners adhere to their respective GDPR/CCPA standards.
              </p>
              <h4 className="font-heading text-lg text-black mb-2 uppercase">Contact Info</h4>
              <div className="pt-4 border-t border-black/10">
                <p className="font-bold text-black">{storeInfo.name} Administration</p>
                <p>{storeInfo.address}</p>
                <p className="text-[var(--color-brand-primary)]">support@satyacomputers.topiko.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
