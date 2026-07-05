import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedIndustries from "../components/TrustedIndustries";
import WhyTakshaya from "../components/WhyTakshaya";
import Journey from "../components/Journey";
import HowItWorks from "../components/HowItWorks";
import LeadCenter from "../components/LeadCenter";
import ManufacturerForm from "../components/ManufacturerForm";
import ToolOwnerForm from "../components/ToolOwnerForm";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedIndustries />
      <WhyTakshaya />
      <Journey />
      <HowItWorks />
      <LeadCenter />
      <ManufacturerForm />
      <ToolOwnerForm />
      <Stats />
      <Footer />
    </>
  );
}