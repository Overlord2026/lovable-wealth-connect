
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdvisorSection } from "@/components/AdvisorSection";

const Advisors = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="pt-24">
          <AdvisorSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Advisors;
