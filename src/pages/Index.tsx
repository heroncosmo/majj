import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { ServicesGrid } from "@/components/services-grid";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesGrid />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
