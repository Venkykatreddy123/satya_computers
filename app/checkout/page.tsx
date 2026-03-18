'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import BrutalButton from '@/components/ui/BrutalButton';
import GrainOverlay from '@/components/ui/GrainOverlay';
import { Check, ClipboardList, MapPin, Phone, Mail } from 'lucide-react';

export default function CheckoutPage() {
  const { cartTotal, clearCart, items } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    street: '',
    city: '',
    pincode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsReviewing(!isReviewing);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          address: `${formData.street}, ${formData.city} - ${formData.pincode}`,
          cartItems: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price, image: i.image })),
          totalPrice: cartTotal,
          paymentMethod: paymentMethod
        })
      });

      if (!res.ok) {
        throw new Error('Failed to place order');
      }

      const data = await res.json();
      clearCart();
      router.push(`/order-status?id=${data.orderId}`);
    } catch (err: any) {
      alert('Error placing order: ' + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg relative pb-24">
      <GrainOverlay opacity={30} />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-b border-white/10">
        <h1 className="font-heading text-6xl md:text-8xl text-brand-text tracking-tight mb-4 uppercase">
          {isReviewing ? 'REVIEW' : 'SECURE'} <span className="text-[var(--color-gold)]">{isReviewing ? 'DETAILS' : 'CHECKOUT'}</span>
        </h1>
        <p className="font-body text-xl text-brand-text/50 uppercase tracking-[0.2em]">
          {isReviewing ? 'Verify Deployment Coordinates' : 'Finalize Your Deployment'}
        </p>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Checkout Form or Review */}
        <div className="w-full lg:w-2/3">
          {!isReviewing ? (
            <form onSubmit={toggleReview} className="bg-white border border-black/10 p-8 md:p-12 shadow-2xl flex flex-col gap-10">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <ClipboardList className="text-[var(--color-gold)]" size={24} />
                  <h3 className="font-heading text-3xl text-brand-text uppercase tracking-tighter">CONTACT INFO</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body text-brand-text">
                  <div className="relative group">
                    <label htmlFor="fullName" className="block text-[10px] font-heading tracking-widest text-brand-text/40 mb-2 uppercase">Full Name</label>
                    <input 
                      id="fullName" 
                      required 
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border border-black/10 p-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-brand-text uppercase placeholder:normal-case" 
                      type="text" 
                      placeholder="ENTER LEGAL NAME"
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-[10px] font-heading tracking-widest text-brand-text/40 mb-2 uppercase">WhatsApp Number</label>
                    <div className="flex">
                      <span className="bg-gray-100 border border-r-0 border-black/10 p-4 font-body text-sm">+91</span>
                      <input 
                        id="whatsapp" 
                        required 
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full bg-gray-50/50 border border-black/10 p-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-brand-text" 
                        type="tel" 
                        pattern="[0-9]{10}"
                        placeholder="83091XXXXX"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-[10px] font-heading tracking-widest text-brand-text/40 mb-2 uppercase">Email Address (FOR INVOICE)</label>
                    <input 
                      id="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border border-black/10 p-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-brand-text" 
                      type="email" 
                      placeholder="arch@satyacomputers.topiko.com"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-black/5 pt-10">
                <div className="flex items-center gap-4 mb-8">
                  <MapPin className="text-[var(--color-brand-primary)]" size={24} />
                  <h3 className="font-heading text-3xl text-brand-text uppercase tracking-tighter">SHIPPING DOMAIN</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body text-brand-text">
                  <div className="md:col-span-2">
                    <label htmlFor="street" className="block text-[10px] font-heading tracking-widest text-brand-text/40 mb-2 uppercase">Street Address</label>
                    <input 
                      id="street" 
                      required 
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border border-black/10 p-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-brand-text uppercase placeholder:normal-case" 
                      type="text" 
                      placeholder="HOUSE / OFFICE NO, STREET"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-[10px] font-heading tracking-widest text-brand-text/40 mb-2 uppercase">City</label>
                    <input 
                      id="city" 
                      required 
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border border-black/10 p-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-brand-text uppercase placeholder:normal-case" 
                      type="text" 
                      placeholder="HYDERABAD"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-[10px] font-heading tracking-widest text-brand-text/40 mb-2 uppercase">Pincode</label>
                    <input 
                      id="pincode" 
                      required 
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border border-black/10 p-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-brand-text" 
                      type="text" 
                      placeholder="5000XX"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-black/5 pt-10">
                <h3 className="font-heading text-3xl text-brand-text mb-8 uppercase tracking-tighter">PAYMENT METHOD</h3>
                <div className="space-y-4">
                  <label className={`flex items-center gap-4 p-6 border-2 cursor-pointer group transition-all relative overflow-hidden ${paymentMethod === 'COD' ? 'border-[var(--color-brand-primary)] bg-orange-50/30 shadow-[0_4px_20px_rgba(241,90,36,0.1)]' : 'border-black/5 hover:border-black/20'}`}>
                    {paymentMethod === 'COD' && (
                      <div className="absolute top-0 right-0 bg-[var(--color-brand-primary)] text-white text-[8px] font-heading tracking-[0.2em] px-3 py-1 uppercase z-10">
                        RECOMMENDED
                      </div>
                    )}
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'COD'} 
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[var(--color-brand-primary)] w-5 h-5 shrink-0" 
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-xl text-brand-text">CASH ON DELIVERY (COD)</span>
                        <div className="hidden sm:block px-2 py-0.5 border border-[var(--color-brand-primary)]/30 text-[var(--color-brand-primary)] text-[8px] font-heading tracking-widest uppercase rounded">
                           Zero Risk
                        </div>
                      </div>
                      <span className="font-body text-[10px] text-brand-text/40 font-bold uppercase tracking-widest">Pay Only After Verification • Best for Trust</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center gap-4 p-6 border-2 cursor-pointer group transition-all ${paymentMethod === 'UPI' ? 'border-[var(--color-gold)] bg-orange-50/30' : 'border-black/5 hover:border-black/20'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'UPI'} 
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[var(--color-gold)] w-5 h-5" 
                    />
                    <div className="flex flex-col">
                      <span className="font-heading text-xl text-brand-text">UPI / DIGITAL WALLET</span>
                      <span className="font-body text-[10px] text-brand-text/40 font-bold uppercase tracking-widest">Pay via WhatsApp after placing order</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-black/5">
                <BrutalButton type="submit" disabled={items.length === 0} className="w-full !h-20 text-3xl">
                  CONTINUE TO REVIEW
                </BrutalButton>
                <p className="text-center mt-6 font-heading text-[10px] tracking-widest text-brand-text/30 uppercase">Please verify your details in the next step.</p>
              </div>
            </form>
          ) : (
            <div className="bg-white border border-black/10 p-8 md:p-12 shadow-2xl flex flex-col gap-10 animation-fade-in">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading text-3xl text-brand-text uppercase tracking-tighter flex items-center gap-3">
                    <ClipboardList className="text-[var(--color-gold)]" size={28} />
                    CONFIRM INFORMATION
                  </h3>
                  <button onClick={() => setIsReviewing(false)} className="text-[var(--color-gold)] font-heading text-xs hover:underline uppercase tracking-widest">
                    [ EDIT DETAILS ]
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-body">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-heading text-[10px] tracking-widest text-brand-text/40 uppercase mb-2">Recipient</h4>
                      <p className="text-xl text-brand-text font-bold uppercase">{formData.fullName}</p>
                    </div>
                    <div>
                      <h4 className="font-heading text-[10px] tracking-widest text-brand-text/40 uppercase mb-2">WhatsApp Contact</h4>
                      <p className="text-xl text-brand-text font-bold">+91 {formData.whatsapp}</p>
                    </div>
                    <div>
                      <h4 className="font-heading text-[10px] tracking-widest text-brand-text/40 uppercase mb-2">Email for Invoice</h4>
                      <p className="text-lg text-brand-text font-medium">{formData.email}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-heading text-[10px] tracking-widest text-brand-text/40 uppercase mb-2">Deployment Address</h4>
                      <p className="text-lg text-brand-text font-bold leading-relaxed uppercase">
                        {formData.street}<br />
                        {formData.city} - {formData.pincode}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-heading text-[10px] tracking-widest text-brand-text/40 uppercase mb-2">Protocol</h4>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 text-[var(--color-gold)] rounded-md">
                          <Check size={20} />
                        </div>
                        <p className="text-lg text-brand-text font-bold uppercase">{paymentMethod === 'COD' ? 'Cash on Delivery' : 'UPI / Digital Payment'}</p>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="bg-gray-50 p-8 border border-black/5 space-y-4">
                  <p className="font-heading text-xs tracking-widest text-brand-text/60 uppercase">Final Authorization Notice:</p>
                  <p className="font-body text-sm text-brand-text/80 leading-relaxed">
                    By clicking &quot;AUTHORIZE DEPLOYMENT&quot;, you are placing a firm professional order. 
                    {paymentMethod === 'COD' 
                      ? " Our representative will contact you on WhatsApp to confirm the delivery window." 
                      : " You will receive a UPI QR code/Payment link on your WhatsApp for the digital transfer."
                    }
                  </p>
               </div>

               <div className="flex flex-col gap-6">
                  <BrutalButton onClick={handleSubmit} disabled={isSubmitting} className="w-full !h-24 text-3xl flex flex-col items-center justify-center gap-1">
                    {isSubmitting ? (
                      <span className="animate-pulse">SYNCHRONIZING...</span>
                    ) : (
                      <>
                        <span>AUTHORIZE DEPLOYMENT</span>
                        <span className="text-[10px] tracking-[0.4em] opacity-40">STRIKE TO FINALIZE</span>
                      </>
                    )}
                  </BrutalButton>
                  <button onClick={() => setIsReviewing(false)} className="text-center font-heading text-xs text-brand-text/40 hover:text-black tracking-widest uppercase transition-colors">
                    Back to Coordinates
                  </button>
               </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-black/10 p-10 sticky top-28 shadow-xl">
            <h3 className="font-heading text-2xl mb-8 tracking-widest text-brand-text border-b border-black/10 pb-6 uppercase">ORDER INVENTORY</h3>
            
            <div className="space-y-6 mb-10">
               {items.map(item => (
                 <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex flex-col">
                      <span className="font-heading text-lg text-brand-text group-hover:text-[var(--color-gold)] transition-colors uppercase">{item.name}</span>
                      <span className="font-body text-[10px] text-brand-text/40 font-bold">QTY: {item.quantity}</span>
                    </div>
                    <span className="font-body text-sm font-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                 </div>
               ))}
            </div>

            <div className="space-y-4 font-body text-brand-text/60 mb-8 border-t border-black/10 pt-8 text-sm uppercase tracking-widest">
              <div className="flex justify-between">
                <span>SUB-TOTAL</span>
                <span className="text-brand-text">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>LOGISTICS / SHIPPING</span>
                <span className="text-green-600 font-black">FREE_DEPLOY</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 pt-6 border-t-[3px] border-black">
              <span className="font-heading text-xs text-[var(--color-brand-primary)] tracking-[0.3em] font-black uppercase">TOTAL DEPLOYMENT VALUE</span>
              <span className="font-body text-5xl text-brand-text font-black">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="mt-10 p-6 bg-gray-50 border border-black/5 flex items-center gap-4">
               <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                 <Check size={20} />
               </div>
               <p className="font-heading text-[10px] tracking-widest text-black/50 uppercase leading-relaxed">System Architecture verified and ready for immediate dispatch.</p>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
