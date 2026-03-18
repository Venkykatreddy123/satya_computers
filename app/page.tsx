import SplitHero from '@/components/sections/SplitHero';
import GrainOverlay from '@/components/ui/GrainOverlay';
import FlashSaleBanner from '@/components/sections/FlashSaleBanner';
import TrustedMarquee from '@/components/sections/TrustedMarquee';
import ProfessionalTrust from '@/components/sections/ProfessionalTrust';
import TestingProcess from '@/components/sections/TestingProcess';
import MissionLogs from '@/components/sections/MissionLogs';
import B2BTier from '@/components/sections/B2BTier';
import CategoryGrid from '@/components/sections/CategoryGrid';
import InteractiveFAQ from '@/components/sections/InteractiveFAQ';
import EliteSelection from '@/components/sections/EliteSelection';
import InternalComponents from '@/components/sections/InternalComponents';
import CorporateTrust from '@/components/sections/CorporateTrust';
import EcoImpact from '@/components/sections/EcoImpact';
import SystemQuiz from '@/components/sections/SystemQuiz';
import HotOffers from '@/components/sections/HotOffers';
import AdminTeam from '@/components/sections/AdminTeam';
import OperationsPulse from '@/components/sections/OperationsPulse';
import LiveDeployments from '@/components/sections/LiveDeployments';
import LiveTicker from '@/components/ui/LiveTicker';
import TrackOrder from '@/components/sections/TrackOrder';
import InventoryAnalytics from '@/components/sections/InventoryAnalytics';
import { 
  getFeaturedProducts, 
  getLiveAnnouncement, 
  getActiveOffers, 
  getCompanyStats, 
  getPartners, 
  getTeam, 
  getRecentOrders,
  getLiveActivity,
  getInventoryStats,
  getCategoryStats
} from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [
    featuredProducts, 
    liveAnnouncement, 
    activeOffers, 
    companyStats, 
    partners, 
    team, 
    recentOrders,
    liveActivity,
    inventoryStats,
    categoryStats
  ] = await Promise.all([
    getFeaturedProducts(),
    getLiveAnnouncement(),
    getActiveOffers(),
    getCompanyStats(),
    getPartners(),
    getTeam(),
    getRecentOrders(),
    getLiveActivity(),
    getInventoryStats(),
    getCategoryStats()
  ]);

  return (
    <main className="min-h-screen bg-white relative">
      <GrainOverlay opacity={5} />
      
      <FlashSaleBanner announcement={liveAnnouncement} />
      <LiveTicker activities={liveActivity} />
      
      <SplitHero />
      <TrustedMarquee partners={partners} />
      
      <TrackOrder />
      
      <InventoryAnalytics stats={inventoryStats} />
      
      <CorporateTrust stats={companyStats} />
      <ProfessionalTrust />
      <CategoryGrid counts={categoryStats} />
      <EliteSelection products={featuredProducts} />
      <HotOffers offers={activeOffers} />
      <OperationsPulse stats={companyStats} />
      <LiveDeployments orders={recentOrders} />
      <InternalComponents />
      <AdminTeam team={team} />

      <SystemQuiz />
      <TestingProcess />
      <EcoImpact unitCount={companyStats.unitCount} />
      <B2BTier />
      <InteractiveFAQ />
      <MissionLogs />
    </main>
  );
}
