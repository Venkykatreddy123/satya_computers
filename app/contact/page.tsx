import { storeInfo } from '@/data/store-info';
import GrainOverlay from '@/components/ui/GrainOverlay';

import BrutalButton from '@/components/ui/BrutalButton';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white relative pb-24">
      <GrainOverlay opacity={5} />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-b border-black/10">

        <h1 className="font-heading text-6xl md:text-8xl text-brand-text tracking-tight mb-4 uppercase">
          CONTACT <span className="text-[var(--color-brand-primary)]">US</span>
        </h1>
        <p className="font-body text-xl text-brand-text-muted max-w-2xl">
          Get in touch with our team for bulk orders, enterprise sales, or support inquiries.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16">
        
        {/* Contact Info blocks */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div className="bg-white border border-[var(--color-brand-accent)]/10 p-8 shadow-sm">
            <h3 className="font-heading text-2xl text-[var(--color-brand-accent)] mb-4 tracking-widest">VISIT STORE</h3>
            <p className="font-body text-brand-text-muted leading-relaxed">
              {storeInfo.address}
            </p>
          </div>

          <div className="bg-white border border-[var(--color-brand-accent)]/10 p-8 shadow-sm">
            <h3 className="font-heading text-2xl text-[var(--color-brand-accent)] mb-4 tracking-widest">CALL US</h3>
            <p className="font-body text-brand-text-muted text-xl">
              +91 {storeInfo.phone}
            </p>
            <p className="font-body text-brand-text/50 mt-2 text-sm">Mon-Sat: 10AM - 8PM</p>
          </div>

          <div className="bg-white border border-[var(--color-brand-accent)]/10 p-8 shadow-sm">
            <h3 className="font-heading text-2xl text-[var(--color-brand-accent)] mb-4 tracking-widest">WHATSAPP</h3>
            <p className="font-body text-brand-text-muted text-xl mb-4">
              +{storeInfo.whatsapp}
            </p>
            <a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noreferrer">
              <BrutalButton className="w-full text-sm">MESSAGE NOW</BrutalButton>
            </a>
          </div>
        </div>

        {/* Message Form */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white border border-[var(--color-brand-primary)]/30 p-8 md:p-12 shadow-sm">
            <h2 className="font-heading text-4xl text-brand-text mb-8">SEND A MESSAGE</h2>
            <form className="flex flex-col gap-6 font-body text-brand-text">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-brand-text/60 mb-2">Name</label>
                  <input id="name" className="w-full bg-transparent border border-black/10 p-4 focus:outline-none focus:border-[var(--color-brand-primary)]" type="text" />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm text-brand-text/60 mb-2">Phone / Email</label>
                  <input id="contact" className="w-full bg-transparent border border-black/10 p-4 focus:outline-none focus:border-[var(--color-brand-primary)]" type="text" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-brand-text/60 mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full bg-transparent border border-black/10 p-4 focus:outline-none focus:border-[var(--color-brand-primary)] resize-none"></textarea>
              </div>
              <div className="mt-4">
                <BrutalButton type="button">SEND INQUIRY</BrutalButton>
              </div>
            </form>
          </div>
        </div>

      </section>
    </main>
  );
}
