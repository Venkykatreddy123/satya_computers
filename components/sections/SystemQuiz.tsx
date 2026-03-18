'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Cpu, MonitorPlay, Check, Loader2, ArrowRight, BrainCircuit, BarChart, Server } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { getProductBySlug } from '@/data/products';

type QuizStep = 'workload' | 'budget' | 'analyzing' | 'result';

export default function SystemQuiz() {
  const [step, setStep] = useState<QuizStep>('workload');
  const [workload, setWorkload] = useState('');
  const [budget, setBudget] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[600px] flex items-center justify-center">
       <div className="w-10 h-10 border-4 border-black border-t-[var(--color-brand-primary)] animate-spin" />
    </div>
  );
  
  const getRecommendation = () => {
    let slug = 'lenovo-thinkpad-t470'; // Default
    
    if (workload === 'vfx') {
       slug = budget === 'high' ? 'macbook-pro-a2141-2019' : 'dell-precision-5540';
    } else if (workload === 'code') {
       slug = budget === 'high' ? 'macbook-pro-a1708-2017' : 'lenovo-thinkpad-t480';
    } else if (workload === 'ai') {
       slug = 'macbook-pro-a2141-2019';
    } else if (workload === 'office') {
       slug = budget === 'low' ? 'dell-latitude-7490' : 'lenovo-thinkpad-t490';
    }
    
    return getProductBySlug(slug) || getProductBySlug('lenovo-thinkpad-t470'); 
  };
  
  const recommendedProduct = getRecommendation();

  const handleWorkloadSelect = (type: string) => {
    setWorkload(type);
    setStep('budget');
  };

  const handleBudgetSelect = (b: string) => {
    setBudget(b);
    setStep('analyzing');
    // Simulate deep stack analysis
    setTimeout(() => setStep('result'), 3000);
  };

  const overrideReset = () => {
    setStep('workload');
    setWorkload('');
    setBudget(null);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full mb-6 font-heading text-[10px] tracking-widest uppercase">
          <BrainCircuit size={12} className="text-[var(--color-brand-primary)]" /> A.I. Recommendation Engine
        </div>
        <h2 className="font-heading text-4xl md:text-6xl text-brand-text mb-4 uppercase leading-none">
          SYSTEM <span className="text-[var(--color-brand-primary)]">FINDER v2.0</span>
        </h2>
        <p className="font-body text-brand-text/50 max-w-xl mx-auto uppercase tracking-widest text-[10px]">
          Neural component matching based on operational workload requirements.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white border-2 border-black shadow-[20px_20px_0_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          
          {/* Left Panel: Terminal Decor */}
          <div className="w-full md:w-1/3 bg-[#0A1628] p-8 flex flex-col relative overflow-hidden text-white/90">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(241,90,36,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
             
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="font-heading text-[10px] tracking-[0.3em] uppercase opacity-50">Diagnostic Node</span>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
             </div>
             
             <div className="font-mono text-[10px] text-emerald-400/80 space-y-3 mt-auto relative z-10">
                <p className="flex items-start gap-2">
                   <span className="opacity-40">[01]</span>
                   <span>INITIALIZING QUANTUM SEARCH...</span>
                </p>
                <p className="flex items-start gap-2 animate-pulse">
                   <span className="opacity-40">[02]</span>
                   <span>AWAITING INPUT PARAMETERS_</span>
                </p>
                {(workload || budget) && (
                   <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                      {workload && (
                        <p className="text-orange-400">
                          {'>'} PROFILE: {workload.toUpperCase()}
                        </p>
                      )}
                      {budget && (
                        <p className="text-orange-400">
                          {'>'} PARAM: BUDGET_{budget.toUpperCase()}
                        </p>
                      )}
                      {step === 'analyzing' && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="text-white/40 italic"
                        >
                          {'>'} MATCHING CORES...
                          <br />
                          {'>'} CHECKING THERMALS...
                        </motion.div>
                      )}
                   </div>
                )}
             </div>
             
             {/* Edge Glow */}
             <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-brand-primary)] to-transparent opacity-30" />
          </div>

          {/* Right Panel: Interactive Area */}
          <div className="w-full md:w-2/3 p-10 md:p-16 relative flex flex-col justify-center bg-white">
            <AnimatePresence mode="wait">
               
              {/* STEP 1: WORKLOAD */}
              {step === 'workload' && (
                <motion.div
                  key="workload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <h3 className="font-heading text-3xl text-brand-text mb-2 uppercase tracking-tight">Select <span className="text-[var(--color-brand-primary)]">Workload</span></h3>
                  <p className="font-body text-sm text-brand-text/50 mb-10 uppercase tracking-widest font-bold text-[10px]">What is the primary operational objective?</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                       { id: 'office', icon: Laptop, title: 'Corporate', desc: 'Docs, CRM, Tally' },
                       { id: 'code', icon: Cpu, title: 'DevOps', desc: 'Docker, VS Code' },
                       { id: 'vfx', icon: MonitorPlay, title: 'Creative', desc: '4K Edit, Blender' },
                       { id: 'ai', icon: BrainCircuit, title: 'AI & Data', desc: 'ML Models, Python' },
                     ].map(w => (
                       <button 
                         key={w.id}
                         type='button' suppressHydrationWarning onClick={() => handleWorkloadSelect(w.id)}
                         className="group p-6 border-2 border-black/5 hover:border-black bg-white text-left transition-all duration-300 relative overflow-hidden shadow-sm"
                       >
                         <div className="relative z-10">
                           <div className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-black/5 rounded-lg mb-5 group-hover:bg-black group-hover:text-white transition-all">
                             <w.icon className="w-5 h-5" strokeWidth={1.5} />
                           </div>
                           <div className="font-heading text-lg text-brand-text mb-1 uppercase tracking-wider group-hover:text-[var(--color-brand-primary)] transition-colors">{w.title}</div>
                           <div className="font-body text-[10px] text-brand-text/40 uppercase font-black">{w.desc}</div>
                         </div>
                       </button>
                     ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: BUDGET */}
              {step === 'budget' && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <h3 className="font-heading text-3xl text-brand-text mb-2 uppercase tracking-tight">Compute <span className="text-[var(--color-brand-primary)]">Tier</span></h3>
                  <p className="font-body text-sm text-brand-text/50 mb-10 uppercase tracking-widest font-bold text-[10px]">Select investment bracket for this system.</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                     {[
                       { id: 'low', title: 'ENTRY SCALE', desc: '₹15,000 - ₹25,000', icon: Server },
                       { id: 'mid', title: 'MID-RANGE ELITE', desc: '₹25,000 - ₹45,000', icon: BarChart },
                       { id: 'high', title: 'ULTIMATE PERFORMANCE', desc: '₹45,000+', icon: Cpu },
                     ].map(b => (
                       <button 
                         key={b.id}
                         type='button' suppressHydrationWarning onClick={() => handleBudgetSelect(b.id)}
                         className="group p-6 border-2 border-black/5 hover:border-black bg-white text-left transition-all duration-300 flex items-center gap-6"
                       >
                         <div className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-black/5 rounded-full group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all">
                            <b.icon className="w-6 h-6" strokeWidth={1.5} />
                         </div>
                         <div className="flex-1">
                            <div className="font-heading text-xl text-brand-text uppercase leading-none mb-1">{b.title}</div>
                            <div className="font-body text-xs text-brand-text/50 font-bold uppercase tracking-widest">{b.desc}</div>
                         </div>
                         <ArrowRight className="w-5 h-5 text-black/10 group-hover:text-[var(--color-brand-primary)] group-hover:translate-x-1 transition-all" />
                       </button>
                     ))}
                  </div>
                  
                  <button 
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setStep('workload')} 
                    className="mt-8 font-heading text-[10px] tracking-widest uppercase text-black/30 hover:text-black transition-colors"
                  >
                    ← Change Workload
                  </button>
                </motion.div>
              )}

              {/* STEP 3: ANALYZING */}
              {step === 'analyzing' && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="relative mb-8">
                     <div className="w-24 h-24 rounded-full border-4 border-gray-50 border-t-[var(--color-brand-primary)] animate-spin" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-black/10" />
                     </div>
                  </div>
                  <h3 className="font-heading text-2xl text-brand-text tracking-widest uppercase mb-2">Analyzing Node Matrix</h3>
                  <p className="font-body text-[10px] text-brand-text/40 uppercase font-black tracking-[0.2em]">Verifying hardware compatibility benchmarks...</p>
                </motion.div>
              )}

              {/* STEP 4: RESULT */}
              {step === 'result' && recommendedProduct && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                     <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-500" strokeWidth={3} />
                        <span className="font-heading text-xs tracking-widest uppercase text-emerald-600 font-black">MATCH VERIFIED</span>
                     </div>
                     <span className="font-mono text-[10px] text-black/20">LOG: SIG_FOUND_99.2%</span>
                  </div>

                  <div className="bg-gray-50 border-2 border-dashed border-black/10 p-8 mb-10 relative group">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-48 h-48 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-700">
                         <NextImage src={recommendedProduct.image} alt={recommendedProduct.name} fill className="object-contain drop-shadow-2xl" />
                      </div>
                      
                      <div className="flex-1 text-left space-y-4">
                         <div>
                          <span className="font-heading text-[10px] tracking-[0.3em] text-[var(--color-brand-primary)] uppercase font-bold">{recommendedProduct.brand} ENGINEERED</span>
                          <h4 className="font-heading text-3xl text-brand-text uppercase leading-[0.9] mt-2">{recommendedProduct.name}</h4>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white p-3 border border-black/5">
                              <span className="block font-heading text-[8px] text-black/30 tracking-widest mb-1 uppercase">PROCESSOR</span>
                              <span className="block font-body text-[11px] font-black uppercase text-black truncate">{recommendedProduct.specs.processor}</span>
                           </div>
                           <div className="bg-white p-3 border border-black/5">
                              <span className="block font-heading text-[8px] text-black/30 tracking-widest mb-1 uppercase">MEMORY</span>
                              <span className="block font-body text-[11px] font-black uppercase text-black">{recommendedProduct.specs.ram} DDR4</span>
                           </div>
                         </div>

                         <div className="pt-2">
                           <span className="font-body font-black text-3xl text-black">
                             ₹{recommendedProduct.price.toLocaleString('en-IN')}
                           </span>
                           <span className="ml-2 text-[10px] text-black/30 line-through">₹{(recommendedProduct.price * 1.4).toLocaleString('en-IN')}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/products/${recommendedProduct.slug}`} className="flex-1">
                      <button 
                        type="button"
                        suppressHydrationWarning
                        className="w-full bg-black text-white hover:bg-[var(--color-brand-primary)] transition-all py-5 font-heading text-sm tracking-widest uppercase flex justify-center items-center gap-3 active:scale-[0.98]"
                      >
                        INITIALIZE DEPLOYMENT <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                    <button 
                      type="button"
                      suppressHydrationWarning
                      onClick={overrideReset} 
                      className="px-10 py-5 border-2 border-black hover:bg-black hover:text-white text-black font-heading text-sm tracking-widest uppercase transition-all active:scale-[0.98]"
                    >
                      RE-SCAN
                    </button>
                  </div>
                </motion.div>
              )}
               
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

