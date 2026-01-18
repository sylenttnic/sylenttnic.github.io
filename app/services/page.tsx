import WizardForm from "@/components/WizardForm";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Image from "next/image";
import MastheadContent from "@/components/services/MastheadContent";
import Timeline from "@/components/services/Timeline";

export default function Services() {
  return (
    <>
      {/* Masthead */}
      <header className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/masthead.webp"
            alt="Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <MastheadContent />
        </div>
        <ScrollIndicator />
      </header>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-950 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <Timeline />
        </div>
      </section>

      {/* Quiz Section */}
      <section id="join" className="py-20 bg-slate-900/50 scroll-mt-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get Your Friction Score</h2>
            <p className="text-slate-400">Identify your operational bottlenecks and get a custom roadmap.</p>
          </div>
          <WizardForm />
        </div>
      </section>
    </>
  );
}
