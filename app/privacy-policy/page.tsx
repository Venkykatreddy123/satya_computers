import { storeInfo } from '@/data/store-info';

export const metadata = {
  title: 'Privacy Policy | Satya Computers',
  description: 'Privacy policy for Satya Computers.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="font-heading text-5xl text-brand-text tracking-tight mb-8 uppercase">
        Privacy <span className="text-[var(--color-brand-primary)]">Policy</span>
      </h1>
      <div className="prose prose-slate max-w-none font-body text-brand-text-muted space-y-6">
        <p>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>
          At {storeInfo.name}, we are committed to protecting your personal information and your right to privacy.
          This Privacy Policy describes how we collect, use, and share information about you when you visit our store
          or make a purchase.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Information We Collect</h2>
        <p>
          We collect information you provide to us directly, such as your name, email address, phone number,
          shipping address, and payment information when you place an order or contact us.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">How We Use Your Information</h2>
        <p>
          We use the information we collect to process your orders, communicate with you, improve our services,
          and comply with legal obligations. We do not sell your personal data to third parties.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Contact Us</h2>
        <p>
          For any privacy-related queries, contact us at:<br />
          <strong>{storeInfo.address}</strong><br />
          Phone: +91 {storeInfo.phone}
        </p>
      </div>
    </main>
  );
}
