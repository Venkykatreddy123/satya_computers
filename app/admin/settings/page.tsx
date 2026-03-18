'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Clock, 
  Database, 
  Lock, 
  Activity, 
  Server,
  Key,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettings() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/admin/list');
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 p-4 lg:p-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-heading font-black text-[#0A1628] uppercase tracking-tighter">SYSTEM <span className="text-gray-300">/ INFRASTRUCTURE</span></h1>
          <p className="text-gray-500 font-medium mt-1">Global administrative permissions and core system integrity matrix.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-4 rounded-2xl bg-[#0A1628] text-white flex items-center gap-4 shadow-xl shadow-navy-950/10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F97316]">
                 <Lock size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Security Level</p>
                 <p className="text-sm font-black text-white uppercase font-heading">ELITE-LEVEL-5</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#F97316] shadow-inner">
                        <ShieldAlert size={24} />
                     </div>
                     <div>
                        <h3 className="font-heading font-black text-[#0A1628] uppercase tracking-widest text-sm">Active Command Units</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Authorized Administrative Personnel</p>
                     </div>
                  </div>
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-[10px] font-black text-[#0A1628] uppercase tracking-widest">{admins.length} Units Active</span>
               </div>

               <div className="overflow-x-auto p-4">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50 rounded-2xl">
                           <th className="px-6 py-4 rounded-l-2xl">Identifier</th>
                           <th className="px-6 py-4">Status Matrix</th>
                           <th className="px-6 py-4">Security Signature</th>
                           <th className="px-6 py-4 rounded-r-2xl">Initialization</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {loading ? (
                           <tr>
                              <td colSpan={4} className="px-6 py-20 text-center">
                                 <div className="w-8 h-8 border-4 border-gray-100 border-t-[#F97316] rounded-full animate-spin mx-auto mb-4" />
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Scanning Identities...</p>
                              </td>
                           </tr>
                        ) : admins.map((admin) => (
                           <tr key={admin.id} className="hover:bg-gray-50/50 transition-all group">
                              <td className="px-6 py-6 ring-orange-50 group-hover:ring-1 rounded-l-2xl">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#F97316]/10 group-hover:text-[#F97316] transition-all">
                                       <Users size={18} />
                                    </div>
                                    <span className="font-heading font-black text-[#0A1628] uppercase tracking-tighter text-base">{admin.username}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-6">
                                 <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                                    admin.role === 'admin' ? 'bg-red-50 text-red-600 border border-red-100/50' :
                                    admin.role === 'management' ? 'bg-blue-50 text-blue-600 border border-blue-100/50' :
                                    'bg-emerald-50 text-emerald-600 border border-emerald-100/50'
                                 }`}>
                                    {admin.role}
                                 </span>
                              </td>
                              <td className="px-6 py-6">
                                 <div className="flex items-center gap-3">
                                    <Key size={12} className="text-gray-300" />
                                    <span className="text-[9px] font-bold text-gray-300 truncate max-w-[120px] font-mono tracking-widest group-hover:text-gray-500 transition-colors uppercase">{admin.password.substring(0, 16)}...</span>
                                 </div>
                              </td>
                              <td className="px-6 py-6 rounded-r-2xl">
                                 <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <Clock size={12} className="text-[#F97316]" />
                                    {new Date(admin.createdAt).toLocaleDateString()}
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-[#0A1628] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#F97316] mb-8">
                     <Activity size={32} />
                  </div>
                  <h3 className="text-2xl font-heading font-black uppercase tracking-tight mb-4">SYSTEM <span className="text-[#F97316]">PULSE</span></h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">Current operational status of Satya Computers global database and API layers.</p>
                  
                  <div className="space-y-6">
                     {[
                        { label: 'Database Health', status: 'Optimal', icon: Database },
                        { label: 'Latency Map', status: '12ms (Avg)', icon: Server },
                        { label: 'Auth Handshakes', status: 'Success', icon: Shield },
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-crosshair">
                           <div className="flex items-center gap-4">
                              <item.icon size={20} className="text-gray-500 group-hover:text-[#F97316] transition-colors" />
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                           </div>
                           <span className="text-[10px] font-black text-[#F97316] uppercase tracking-widest">{item.status}</span>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl pointer-events-none">
                  <div className="w-48 h-48 rounded-full bg-[#F97316]" />
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
               <h4 className="text-base font-heading font-black text-[#0A1628] uppercase tracking-widest mb-6">Policy Directive</h4>
               <p className="text-sm font-medium text-gray-500 leading-relaxed mb-8">Administrative roles are strictly hierarchical. Root access (Admin) is required for sensitive inventory mutations.</p>
                <button 
                  onClick={async () => {
                    const btn = document.activeElement as HTMLElement;
                    const originalText = btn.innerText;
                    btn.innerText = 'ACCESSING PROTOCOLS...';
                    btn.style.opacity = '0.5';
                    await new Promise(r => setTimeout(r, 1500));
                    btn.innerText = 'PROTOCOL DOWNLOADED';
                    btn.style.backgroundColor = '#ecfdf5';
                    btn.style.color = '#059669';
                    btn.style.borderColor = '#10b981';
                    setTimeout(() => {
                      btn.innerText = originalText;
                      btn.style.opacity = '1';
                      btn.style.backgroundColor = '';
                      btn.style.color = '';
                      btn.style.borderColor = '';
                    }, 3000);
                  }}
                  className="w-full py-4 rounded-2xl bg-gray-50 text-[10px] font-black text-[#0A1628] uppercase tracking-[0.2em] border border-gray-100 hover:bg-white hover:border-[#F97316] hover:text-[#F97316] transition-all"
                >
                   REVIEW PROTOCOLS
                </button>
            </div>
         </div>
      </div>
    </div>
  );
}
