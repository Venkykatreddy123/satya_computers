'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function GoldNavBar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('satya_user');
    if (savedUser) setUser(savedUser);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="w-full bg-white border-b border-black/5 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <img
                  src="/satya_computers_logo.png"
                  alt="Satya Computers"
                  className="h-14 w-auto transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-heading text-3xl text-brand-text tracking-widest hidden sm:block group-hover:text-[var(--color-brand-primary)] transition-colors">
                  SATYA<span className="text-[var(--color-brand-primary)]">COMPUTERS</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-heading text-xl text-brand-text hover:text-[var(--color-brand-primary)] relative group overflow-hidden"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-brand-accent)] transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              <Link href="/account" className="flex items-center gap-2 text-brand-text hover:text-[var(--color-brand-primary)] transition-colors" aria-label="User Profile">
                <User size={24} />
                {user && <span className="font-heading text-sm hidden sm:block mt-1 tracking-widest">{user}</span>}
              </Link>
              <Link href="/cart" className="relative text-brand-text hover:text-[var(--color-brand-primary)] transition-colors" aria-label="Shopping Cart">
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-brand-primary)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-brand-text hover:text-[var(--color-brand-primary)] transition-colors p-1"
                aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <span className="font-heading text-xl tracking-widest text-brand-text">
            SATYA<span className="text-[var(--color-brand-primary)]">MENU</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close Menu"
            className="text-brand-text/50 hover:text-black transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`font-heading text-2xl py-3 border-b border-black/5 tracking-widest transition-colors ${
                pathname === item.href
                  ? 'text-[var(--color-brand-primary)]'
                  : 'text-brand-text hover:text-[var(--color-brand-primary)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-6 py-6 border-t border-black/10 flex gap-6">
          <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 font-body text-sm text-brand-text/60 hover:text-[var(--color-brand-primary)] transition-colors" aria-label="Account">
            <User size={20} /> Account
          </Link>
          <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 font-body text-sm text-brand-text/60 hover:text-[var(--color-brand-primary)] transition-colors" aria-label="Cart">
            <ShoppingCart size={20} /> Cart {itemCount > 0 && <span className="bg-[var(--color-brand-primary)] text-white text-xs rounded-full px-1.5 py-0.5">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </>
  );
}
