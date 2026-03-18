'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function GoldNavBar() {
  const { itemCount } = useCart();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('satya_user');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = async () => {
    if (session) {
      await signOut({ redirect: true, callbackUrl: '/' });
    }
    localStorage.removeItem('satya_user');
    setUser(null);
    window.location.reload();
  };

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

  const displayName = session?.user?.name || user;

  return (
    <>
      <nav className="w-full bg-transparent relative z-50">
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
              <div className="flex items-center gap-3">
                <Link href="/account" className="flex items-center gap-2 text-brand-text hover:text-[var(--color-brand-primary)] transition-colors" aria-label="User Profile">
                  <User size={24} />
                  {displayName && <span className="font-heading text-sm hidden sm:block mt-1 tracking-widest">{displayName}</span>}
                </Link>
                {displayName && (
                  <button 
                    onClick={handleLogout}
                    className="text-brand-text hover:text-red-500 transition-colors p-1"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                )}
              </div>
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


      {/* Mobile Drawer */}
      <AnimatePresence>
        {mounted && mobileOpen && (
          <div className="fixed inset-0 z-[9999] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[350px] bg-white shadow-2xl flex flex-col pointer-events-auto"
            >
              <div className="p-8 border-b border-black/5 flex items-center justify-between">
                <span className="font-heading text-2xl tracking-[0.2em] text-black">
                  SATYA<span className="text-[var(--color-brand-primary)]">MENU</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-black/5 rounded-full text-black hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 px-8 py-12 flex flex-col gap-6 overflow-y-auto">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-heading text-4xl uppercase tracking-tighter ${
                      pathname === item.href ? 'text-[var(--color-brand-primary)]' : 'text-black'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="p-8 border-t border-black/5 flex flex-col gap-6 bg-gray-50/50">
                <div className="flex gap-8">
                   <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 font-heading text-xs tracking-widest text-black/40 hover:text-black transition-colors uppercase font-bold">
                     <User size={16} /> Account
                   </Link>
                   <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 font-heading text-xs tracking-widest text-black/40 hover:text-black transition-colors uppercase font-bold">
                     <ShoppingCart size={16} /> Cart ({itemCount})
                   </Link>
                </div>
                
                <div className="text-[10px] font-heading tracking-[0.3em] font-black text-black opacity-10 uppercase mt-4">
                  POWERED BY SATYA_TECH
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
