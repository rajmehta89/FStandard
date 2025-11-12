import React from 'react';
import HeroSection from '../components/HeroSection';
import KpiSection from '../components/KpiSection';
import HowItWorksSection from '../components/HowItWorksSection';
import PricingSection from '../components/PricingSection';
import FaqSection from '../components/FaqSection';

const LandingPage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <KpiSection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
    </main>
  );
};

export default LandingPage;
