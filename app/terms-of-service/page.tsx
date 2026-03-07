import { storeInfo } from '@/data/store-info';

export const metadata = {
  title: 'Terms of Service | Satya Computers',
  description: 'Terms and conditions for using Satya Computers.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="font-heading text-5xl text-brand-text tracking-tight mb-8 uppercase">
        Terms of <span className="text-[var(--color-brand-primary)]">Service</span>
      </h1>
      <div className="prose prose-slate max-w-none font-body text-brand-text-muted space-y-6">
        <p>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>
          By accessing and using the {storeInfo.name} website and services, you agree to be bound by these
          Terms of Service. Please read them carefully before making a purchase.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Products & Pricing</h2>
        <p>
          All prices are listed in Indian Rupees (INR) and are subject to change without notice. We reserve the
          right to refuse service to anyone for any reason at any time.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Orders & Payments</h2>
        <p>
          We accept various payment methods. Orders are confirmed only after successful payment. We are not
          responsible for any losses due to incorrect information provided by customers.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Warranty & Support</h2>
        <p>
          Products come with manufacturer warranty as applicable. For support, visit our store or contact us
          via phone or WhatsApp.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Contact Us</h2>
        <p>
          <strong>{storeInfo.address}</strong><br />
          Phone: +91 {storeInfo.phone}
        </p>
      </div>
    </main>
  );
}
