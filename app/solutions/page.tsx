import GrainOverlay from '@/components/ui/GrainOverlay';
import SolutionsCards from '@/components/sections/SolutionsCards';


export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <GrainOverlay opacity={10} />
      

      
      <div className="mb-16">
        <h1 className="font-heading text-5xl md:text-7xl text-[#1A1A1A] mb-4 uppercase">OUR <span className="text-[#F15A24]">SOLUTIONS</span></h1>
        <div className="w-24 border-t-4 border-[#F15A24]"></div>
      </div>
      
      <div className="py-12">
        <p className="font-body text-xl text-brand-text-muted max-w-2xl mb-8">
          Enterprise-grade computing solutions tailored for your business needs. 
          From high-performance workstations to scalable server infrastructure.
        </p>
        
        <SolutionsCards />
      </div>
    </main>
  );
}
