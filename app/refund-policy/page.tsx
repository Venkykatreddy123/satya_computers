import { storeInfo } from '@/data/store-info';

export const metadata = {
  title: 'Refund Policy | Satya Computers',
  description: 'Refund and return policy for Satya Computers.',
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="font-heading text-5xl text-brand-text tracking-tight mb-8 uppercase">
        Refund <span className="text-[var(--color-brand-primary)]">Policy</span>
      </h1>
      <div className="prose prose-slate max-w-none font-body text-brand-text-muted space-y-6">
        <p>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>
          At {storeInfo.name}, we want you to be completely satisfied with your purchase. If you are not
          satisfied, we are here to help.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Returns</h2>
        <p>
          You have 7 days from the date of purchase to return an item. To be eligible for a return, the item
          must be unused, in the same condition you received it, and in its original packaging with all
          accessories and documentation.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Refunds</h2>
        <p>
          Once we receive the returned item and inspect it, we will notify you of the approval or rejection of
          your refund. If approved, the refund will be processed to your original method of payment within
          7–10 business days.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Non-Returnable Items</h2>
        <p>
          Software, consumables (ink cartridges, USB drives after use), and items damaged by misuse are not
          eligible for returns.
        </p>
        <h2 className="font-heading text-2xl text-brand-text uppercase">Contact Us</h2>
        <p>
          For returns and refund queries, please visit our store or contact us:<br />
          <strong>{storeInfo.address}</strong><br />
          Phone: +91 {storeInfo.phone}
        </p>
      </div>
    </main>
  );
}
