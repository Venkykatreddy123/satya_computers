import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[var(--color-brand-accent)] text-white px-4 py-2 flex justify-center items-center z-50 relative">
      <p className="font-heading tracking-widest text-sm md:text-base">
        PREMIUM BUSINESS WORKSTATIONS NOW IN STOCK — <Link href="/products" className="underline font-bold ml-2 text-[var(--color-brand-primary)] hover:opacity-80 transition-opacity">SHOP NOW</Link>
      </p>
    </div>
  );
}
