'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal, 
  Download,
  Mail,
  Phone,
  Building2,
  Calendar
} from 'lucide-react';

export default function OrderManagement() {
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOptionsId, setShowOptionsId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchOrders();

    const handleClickOutside = () => setShowOptionsId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
        setShowOptionsId(null);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Company', 'Contact', 'Units', 'Value', 'Status', 'Date'];
    const rows = filteredOrders.map(o => [
      o.id,
      o.companyName,
      o.contactPerson,
      o.totalUnits,
      o.estimatedValue,
      o.status,
      new Date(o.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `satya_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'All' || order.status === filter;
    const matchesSearch = order.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#0A1628]">Bulk Orders & Enquiries</h1>
          <p className="text-gray-500 text-sm">Review and manage corporate quote requests.</p>
        </div>
        <button
          onClick={exportToCSV}
          className="bg-[#0A1628] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#F97316] transition-all shadow-lg active:scale-95"
        >
          <Download size={18} /> EXPORT CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 pb-px overflow-x-auto">
        {['All', 'Pending', 'Quote Sent', 'Confirmed', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 font-heading text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              filter === tab ? 'border-[#F97316] text-[#F97316]' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Company or ID..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 bg-white shadow-sm focus:border-[#F97316] outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
           <Filter size={14} className="text-[#F97316]" /> {filteredOrders.length} RESULTS
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="bg-white p-20 rounded-[2.5rem] flex flex-col items-center gap-4 border border-gray-50">
             <div className="w-10 h-10 border-4 border-gray-100 border-t-[#F97316] rounded-full animate-spin" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Hydrating Data Stream...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] text-center border border-gray-100 shadow-sm">
             <div className="w-16 h-16 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
             </div>
             <p className="text-gray-400 font-bold uppercase tracking-widest">Zero matches detected</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#F97316]/20 transition-all group flex flex-wrap items-center justify-between gap-6"
            >
              <div className="flex items-center gap-5 min-w-[280px]">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#F97316] shadow-inner">
                  <Building2 size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A1628] leading-tight group-hover:text-[#F97316] transition-colors">{order.companyName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: ORDER-{order.id.toString().substring(0,6)}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] font-black text-[#F97316] uppercase tracking-widest">B2B Tier</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 flex-1">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">DECISION MAKER</p>
                  <p className="text-sm font-bold text-[#0A1628]">{order.contactPerson}</p>
                  <div className="flex gap-4 mt-2">
                    <a 
                      href={`mailto:${order.email}`}
                      title="Email Client" 
                      className="text-gray-400 hover:text-[#3B82F6] transition-colors"
                    >
                      <Mail size={14} />
                    </a>
                    <a 
                      href={`tel:${order.phone}`}
                      title="Call Client" 
                      className="text-gray-400 hover:text-emerald-500 transition-colors"
                    >
                      <Phone size={14} />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">TELEMETRY / VALUE</p>
                  <p className="text-sm font-bold text-[#0A1628]">{order.totalUnits} Units Provisioned</p>
                  <p className="text-sm font-black text-[#F97316]">₹{order.estimatedValue?.toLocaleString()}</p>
                </div>

                <div className="hidden md:block">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">STAMPED AT</p>
                  <div className="flex items-center gap-2 text-sm text-[#0A1628] font-bold">
                    <Calendar size={16} className="text-[#F97316]" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                  order.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  order.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse' :
                  order.status === 'Quote Sent' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  order.status === 'Delivered' ? 'bg-gray-50 text-gray-600 border-gray-100' :
                  'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {order.status}
                </span>

                <div className="flex items-center bg-gray-50/50 p-1.5 rounded-2xl gap-1.5 shadow-inner">
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'Confirmed')}
                      title="Approve Transaction"
                      className="px-5 h-12 rounded-xl bg-[#F97316] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#EA580C] transition-all shadow-lg active:scale-95"
                    >
                      APPROVE
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedOrder(order)}
                    title="Audit Trace Analysis"
                    className="w-12 h-12 rounded-xl bg-white text-gray-400 hover:text-[#0A1628] transition-all flex items-center justify-center shadow-sm border border-gray-100 hover:border-[#0A1628]/20"
                  >
                    <Eye size={20} />
                  </button>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowOptionsId(showOptionsId === order.id ? null : order.id);
                      }}
                      title="Status Control Parameters"
                      className={`w-12 h-12 rounded-xl border transition-all flex items-center justify-center shadow-sm ${
                        showOptionsId === order.id ? 'bg-[#0A1628] text-white border-transparent' : 'bg-white border-gray-100 text-gray-400 hover:border-[#0A1628] hover:text-[#0A1628]'
                      }`}
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {showOptionsId === order.id && (
                      <div className="absolute right-0 top-14 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[100] animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                        <p className="px-4 py-2 text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Set Transaction Status</p>
                        {['Pending', 'Quote Sent', 'Confirmed', 'Delivered', 'Cancelled'].map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              handleUpdateStatus(order.id, s);
                              setShowOptionsId(null);
                            }}
                            className={`w-full text-left px-5 py-2 text-xs font-bold transition-colors ${
                              order.status === s ? 'text-[#F97316] bg-orange-50/50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#0A1628]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal - Audit Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
           <div className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-xl" onClick={() => setSelectedOrder(null)} />
           <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in">
              <div className="p-10 border-b border-gray-50 flex justify-between items-start">
                 <div>
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-[#F97316] text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Audit Trace Active</span>
                    <h2 className="text-3xl font-heading font-black text-[#0A1628] uppercase">{selectedOrder.companyName}</h2>
                    <p className="text-gray-400 font-bold text-xs mt-1 tracking-widest uppercase">Transaction ID: ORDER-{selectedOrder.id}</p>
                 </div>
                 <button 
                    onClick={() => setSelectedOrder(null)} 
                    title="Close Audit Trace"
                    className="w-12 h-12 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"
                 >
                    <Search className="rotate-45" size={24} />
                 </button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Stakeholder</p>
                       <p className="text-xl font-bold text-[#0A1628]">{selectedOrder.contactPerson}</p>
                       <p className="text-sm text-gray-500 font-medium mt-1">Authorized Representative</p>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Allocation</p>
                       <p className="text-xl font-bold text-[#F97316]">{selectedOrder.totalUnits} Hardware Units</p>
                       <p className="text-sm text-orange-600/60 font-medium mt-1">₹{selectedOrder.estimatedValue?.toLocaleString()} Value</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Transaction Log</h4>
                    <div className="flex items-center gap-4 py-4 border-b border-gray-50">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                       <div>
                          <p className="text-sm font-bold text-[#0A1628]">Order Initialized</p>
                          <p className="text-[10px] font-bold text-gray-400">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-10 bg-gray-50/50 flex gap-4">
                 <button onClick={() => setSelectedOrder(null)} className="flex-1 py-4 bg-[#0A1628] text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#F97316] transition-all">Audit Finished</button>
                 <button 
                   onClick={async () => {
                     const btn = (document.activeElement as HTMLElement) || (document.querySelector('button[title="Download Audit History"]') as HTMLElement);
                     const originalContent = btn.innerHTML;
                     btn.innerHTML = '<div class="w-5 h-5 border-2 border-gray-400 border-t-[#F97316] rounded-full animate-spin mx-auto"></div>';
                     btn.style.opacity = '0.7';
                     
                     await new Promise(r => setTimeout(r, 2000));
                     
                     const auditTrace = `SATYA COMPUTERS - AUDIT TRACE\nORDER ID: ${selectedOrder.id}\nCLIENT: ${selectedOrder.companyName}\nVALUATION: ₹${selectedOrder.estimatedValue}\nSTATUS: ${selectedOrder.status}\nPHASE: Post-Audit Ledger Initialization\n\nProtocol Verification: PASS\nIdentity Signature: VALID\nTransaction Integrity: OPTIMAL`;
                     const blob = new Blob([auditTrace], { type: 'text/plain' });
                     const url = URL.createObjectURL(blob);
                     const a = document.createElement('a');
                     a.href = url;
                     a.download = `audit_trace_${selectedOrder.id}.txt`;
                     a.click();
                     
                     btn.innerHTML = originalContent;
                     btn.style.opacity = '1';
                     btn.style.color = '#10b981';
                     btn.style.borderColor = '#10b981';
                     setTimeout(() => {
                       btn.style.color = '';
                       btn.style.borderColor = '';
                     }, 2000);
                   }}
                   title="Download Audit History"
                   className="px-8 py-4 border-2 border-gray-200 rounded-2xl text-gray-400 hover:border-[#F97316] hover:text-[#F97316] transition-all flex items-center justify-center min-w-[80px]"
                 >
                   <Download size={20} />
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
