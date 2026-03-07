'use client';

import { motion } from 'framer-motion';
import { Server, MonitorPlay, GraduationCap, Briefcase, Cpu, Database, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    id: "corp",
    title: "CORPORATE",
    accent: "SETUP",
    description: "Streamline your business operations with our end-to-end IT infrastructure solutions designed for modern workspaces. Uncompromising stability.",
    icon: Briefcase,
    features: [
      { text: "Bulk workstation & laptop procurement", sub: "Premium Brands Only", icon: MonitorPlay },
      { text: "Secure networking & WiFi 6", sub: "Enterprise-grade", icon: Server },
      { text: "Server room architecture", sub: "Storage management", icon: Database },
      { text: "Professional AMC", sub: "Annual Maintenance Contracts", icon: ShieldCheck }
    ]
  },
  {
    id: "edu",
    title: "EDUCATION",
    accent: "LABS",
    description: "Empower the next generation with cutting-edge computing environments tailored for high-density academic use. Relentless performance.",
    icon: GraduationCap,
    features: [
      { text: "High-performance lab setups", sub: "VFX, Coding & Design", icon: Cpu },
      { text: "Thin-client configurations", sub: "Efficient resource sharing", icon: Server },
      { text: "Smart classroom integration", sub: "Projection systems", icon: MonitorPlay },
      { text: "Centralized management", sub: "Software deployment & security", icon: ShieldCheck }
    ]
  }
];

export default function SolutionsCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 perspective-2000">
      {solutions.map((sol, idx) => (
        <motion.div
          key={sol.id}
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: idx * 0.2, type: "spring", bounce: 0.4 }}
          whileHover={{ y: -15, scale: 1.02, rotateY: idx === 0 ? 2 : -2 }}
          className="group relative bg-white border border-black/10 p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.05)] cursor-default overflow-hidden [transform-style:preserve-3d]"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Scanline Effect */}
          <motion.div 
             className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[var(--color-brand-primary)]/10 to-transparent blur-md pointer-events-none"
             animate={{ y: ['-100%', '300%'] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: idx * 1.5 }}
          />

          <div className="relative z-10 flex flex-col h-full transform-gpu [transform:translateZ(30px)]">
            
            {/* Header Area */}
            <div className="flex items-start justify-between mb-8">
               <div>
                  <motion.div 
                    className="w-16 h-1.5 bg-[var(--color-brand-primary)] mb-6 origin-left"
                    whileHover={{ scaleX: 1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <h2 className="font-heading text-4xl md:text-5xl text-brand-text tracking-tight uppercase leading-none">
                     {sol.title} <br/>
                     <span className="text-[var(--color-brand-primary)] italic">{sol.accent}</span>
                  </h2>
               </div>
               
               <div className="w-20 h-20 border border-[var(--color-brand-primary)]/20 bg-[#FAF9F6] rounded-full flex items-center justify-center group-hover:bg-[var(--color-brand-primary)] transition-colors duration-500">
                 <sol.icon className="w-8 h-8 text-[var(--color-brand-primary)] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
               </div>
            </div>

            <p className="font-body text-brand-text/70 mb-10 leading-relaxed text-lg border-l-2 border-black/10 pl-6 py-2 group-hover:border-[var(--color-brand-primary)]/50 transition-colors duration-500">
              {sol.description}
            </p>
            
            <div className="space-y-6 mb-auto">
              <span className="font-heading text-[10px] tracking-[0.3em] text-black/40 uppercase font-bold block mb-4">SYSTEM INCLUSIONS</span>
              {sol.features.map((feature, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-5 p-4 border border-black/5 bg-[#FAFAFA] group-hover:bg-white transition-colors duration-300 relative overflow-hidden"
                  whileHover={{ x: 10, borderColor: "rgba(241, 90, 36, 0.3)" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10 transition-colors duration-300 group-hover:bg-[var(--color-brand-primary)]" />
                  
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-black/5 rounded-full text-brand-text">
                    <feature.icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  
                  <div>
                    <span className="block font-body font-bold text-sm text-brand-text leading-tight mb-1">{feature.text}</span>
                    <span className="block font-heading text-[10px] tracking-widest text-black/50 uppercase">{feature.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative Grid at Bottom */}
             <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
                 <div className="grid grid-cols-4 gap-2">
                    {[...Array(16)].map((_, i) => (
                       <div key={i} className="w-2 h-2 bg-black rounded-full" />
                    ))}
                 </div>
             </div>

          </div>
        </motion.div>
      ))}
    </div>
  );
}
