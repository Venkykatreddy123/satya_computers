'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2, 
  Shield, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Database,
  History,
  FileSearch,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptionsId, setShowOptionsId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch('/api/admin/clients');
        const data = await res.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();

    const handleClickOutside = () => setShowOptionsId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleProtocolAction = async (action: string, company: string) => {
    setProcessingId(`${action}-${company}`);
    await new Promise(r => setTimeout(r, 1500));
    setProcessingId(null);
    setShowOptionsId(null);
  };

  const filteredClients = clients.filter(c => 
    c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-10 p-4 lg:p-0 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-heading font-black text-[#0A1628] uppercase tracking-tighter">PARTNER <span className="text-gray-300">/ DIRECTORY</span></h1>
          <p className="text-gray-500 font-medium mt-1">High-value corporate stakeholders and bulk procurement entities.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316]">
                 <Shield size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                 <p className="text-sm font-black text-[#0A1628]">{clients.length} Corporate Units</p>
              </div>
           </div>
        </div>
      </div>

      {/* Strategic Search Portfolio */}
      <div className="bg-white p-6 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col md:flex-row gap-6 items-stretch md:items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F97316] transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Search by corporate identity or key stakeholder..."
            className="w-full pl-16 pr-8 py-5 rounded-[2rem] border border-transparent bg-gray-50 focus:bg-white focus:border-[#F97316] outline-none transition-all text-sm font-bold text-[#0A1628] shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Corporate Ledger */}
      <div className="bg-white rounded-[3.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden pb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Institutional Identity</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Authorized Liaison</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Engagement Vol</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Portfolio Value</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-14 h-14 border-[5px] border-gray-100 border-t-[#F97316] rounded-full animate-spin" />
                      <p className="font-black text-[10px] uppercase tracking-[0.4em] text-gray-400">Accessing Institutional Database...</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedClients.length > 0 ? (
                paginatedClients.map((client, idx) => (
                  <motion.tr 
                    key={client.companyName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50/80 transition-all group"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 overflow-hidden relative shadow-xl shadow-orange-950/5 p-1 group-hover:scale-110 transition-transform">
                          <Building2 size={28} className="text-[#F97316] opacity-30 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <h4 className="font-heading font-black text-[#0A1628] leading-tight text-lg group-hover:text-[#F97316] transition-colors uppercase tracking-tight">{client.companyName}</h4>
                          <p className="text-[10px] font-black text-[#F97316] tracking-[0.3em] uppercase mt-1 opacity-60">GOLD Tier Partner</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <div>
                          <p className="text-sm font-black text-[#0A1628] uppercase tracking-tighter">{client.contactPerson}</p>
                          <div className="flex items-center gap-3 mt-2">
                             <a href={`mailto:${client.email}`} title={`Email to ${client.contactPerson}`} className="text-gray-400 hover:text-blue-500 transition-colors"><Mail size={14} /></a>
                             <a href={`tel:${client.phone}`} title={`Call ${client.contactPerson}`} className="text-gray-400 hover:text-emerald-500 transition-colors"><Phone size={14} /></a>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-xl font-heading font-black text-[#0A1628]">{client.totalOrders}</p>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Directives</p>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-xl font-heading font-black text-[#F97316]">₹{client.totalValue?.toLocaleString()}</p>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Gross Acquisition</p>
                    </td>
                    <td className="px-10 py-8">
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowOptionsId(showOptionsId === client.companyName ? null : client.companyName);
                          }}
                          title="Corporate Action Matrix"
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                            showOptionsId === client.companyName ? 'bg-[#0A1628] text-white' : 'bg-white border border-gray-100 text-gray-400 hover:text-[#0A1628] hover:shadow-xl'
                          }`}
                        >
                          <MoreVertical size={20} />
                        </button>
                        
                        <AnimatePresence>
                          {showOptionsId === client.companyName && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute right-0 top-14 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 py-4 z-[100] overflow-hidden"
                              onClick={e => e.stopPropagation()}
                            >
                              <p className="px-6 py-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 mb-2">Corporate Protocols</p>
                              {[
                                { 
                                  icon: History, 
                                  label: 'Transaction Feed', 
                                  action: () => router.push(`/admin/orders?search=${client.companyName}`) 
                                },
                                { 
                                  icon: FileSearch, 
                                  label: 'Audit engagement', 
                                  action: () => handleProtocolAction('audit', client.companyName) 
                                },
                                { 
                                  icon: Database, 
                                  label: 'Data Sync', 
                                  action: () => handleProtocolAction('sync', client.companyName) 
                                },
                                { 
                                  icon: Trash2, 
                                  label: 'Mark inactive', 
                                  action: () => handleProtocolAction('deactivate', client.companyName), 
                                  danger: true 
                                },
                              ].map((item, i) => (
                                <button
                                  key={i}
                                  onClick={item.action}
                                  className={`w-full flex items-center justify-between px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all ${
                                    item.danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#0A1628]'
                                  }`}
                                >
                                  <div className="flex items-center gap-4">
                                    <item.icon size={16} />
                                    {item.label}
                                  </div>
                                  {processingId === `${item.label.toLowerCase().split(' ')[0]}-${client.companyName}` && (
                                    <Loader2 size={12} className="animate-spin" />
                                  )}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-gray-300 uppercase tracking-[0.5em] font-black text-xs">Zero Partner Records Identified</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Strategic Pagination */}
        <div className="mt-8 flex justify-between items-center px-10">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
             <Users size={14} className="text-[#F97316]" /> {filteredClients.length} Stakeholders Profiled
          </p>
          <div className="flex gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              title="Previous Page"
              className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-[#0A1628] hover:border-[#F97316] transition-all disabled:opacity-20 flex items-center justify-center shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2 px-6 rounded-2xl bg-gray-50 text-[10px] font-black text-[#0A1628] uppercase tracking-widest border border-gray-100">
               Page {currentPage} <span className="text-gray-300">/</span> {totalPages || 1}
            </div>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              title="Next Page"
              className="w-12 h-12 rounded-2xl bg-[#0A1628] text-white hover:bg-[#F97316] transition-all disabled:opacity-20 flex items-center justify-center shadow-xl shadow-navy-950/10"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
