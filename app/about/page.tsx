import { storeInfo } from '@/data/store-info';
import GrainOverlay from '@/components/ui/GrainOverlay';

import BrutalButton from '@/components/ui/BrutalButton';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white relative pb-24">
      <GrainOverlay opacity={30} />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-b border-black/10">

        <h1 className="font-heading text-6xl md:text-8xl text-[#1A1A1A] tracking-tight mb-4 uppercase">
          ABOUT <span className="text-[#F15A24]">US</span>
        </h1>
        <p className="font-body text-xl text-[var(--color-brand-accent)] tracking-widest uppercase mb-8">
          {storeInfo.tagline}
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/2">
          <div className="aspect-[4/3] bg-white border border-[var(--color-brand-accent)]/10 relative flex items-center justify-center p-8 grayscale opacity-80 shadow-sm">
            <h2 className="font-heading text-4xl text-brand-text/10 tracking-[0.5em] text-center">
              EST. HYDERABAD
            </h2>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="font-heading text-4xl text-brand-text mb-6">OUR MISSION</h2>
          <p className="font-body text-brand-text/80 text-lg leading-relaxed mb-8">
             {storeInfo.mission} {storeInfo.expertise} 
             We believe that high-performance computing should be accessible without compromising on build quality or reliability.
          </p>

          <h2 className="font-heading text-3xl text-[var(--color-brand-primary)] mb-6 mt-4 uppercase tracking-wider">OUR SERVICES</h2>
          <ul className="font-body text-brand-text-muted space-y-4 mb-12">
            {storeInfo.services.map((service, idx) => (
              <li key={idx} className="flex flex-row items-center gap-4">
                <div className="w-3 h-3 border border-[var(--color-brand-primary)]"></div>
                {service}
              </li>
            ))}
          </ul>

          <div>
             <Link href="/contact">
                <BrutalButton>GET IN TOUCH</BrutalButton>
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
