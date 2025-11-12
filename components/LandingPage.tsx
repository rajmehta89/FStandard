import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Accordion } from './ui';
import { KPI_DATA, HOW_IT_WORKS_STEPS, FAQ_ITEMS } from '../constants';
import { PLANS } from '../lib/plans';
import type { EvalMode, AccountSize, FaqItem } from '../types';
import HeroSection from './HeroSection';

const KpiSection: React.FC = () => {
    return (
        <div className="bg-background py-16 sm:py-24" id="kpi">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {KPI_DATA.map(kpi => (
                        <Card key={kpi.title} className="text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <h3 className="font-serif text-3xl font-bold text-primary">{kpi.title}</h3>
                            <p className="mt-2 text-body-text">{kpi.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HowItWorksSection: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-slate">Your Journey to Funding</h2>
          <p className="mt-4 text-lg text-body-text max-w-3xl mx-auto">A simple, transparent, and fair process designed for serious traders.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {HOW_IT_WORKS_STEPS.map(step => (
            <div key={step.step} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white font-bold text-2xl mx-auto">
                {step.step}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-dark-slate">{step.title}</h3>
              <p className="mt-2 text-body-text">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatInr = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PricingCard: React.FC<{ 
  size: AccountSize, 
  mode: EvalMode, 
  isSelected: boolean,
  onSelect: () => void 
}> = ({ size, mode, isSelected, onSelect }) => {
  const accountValue = PLANS.PLAN_SIZES[size];
  const fee = PLANS.PRICING[mode][size];
  const rules = PLANS.RULES[mode];

  const checkoutLink = `#/checkout?mode=${mode}&size=${size}`;

  const features = [
    { label: 'Profit Target', value: `${rules.profitTargetPct}%` },
    { label: 'Max Loss', value: `${rules.maxLossPct}%` },
    { label: 'Drawdown Type', value: rules.drawdownType, cap: true },
    { label: 'Payout Cycle', value: '20 Days' },
    { label: 'News Trading', value: 'Allowed' },
    { label: 'Weekend Holding', value: 'Allowed' },
  ];

  return (
    <div 
      onClick={onSelect}
      className={`relative flex flex-col rounded-xl shadow-md transition-all duration-300 overflow-hidden cursor-pointer group ${
        isSelected 
          ? 'bg-dark-slate text-white border-2 border-primary scale-105 z-50 shadow-lg' 
          : 'bg-white border border-border-gray scale-100 z-0 hover:bg-dark-slate hover:text-white hover:border-primary hover:scale-105 hover:z-50 hover:shadow-lg'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-0.5 rounded-bl-lg text-xs font-semibold">
          Selected
        </div>
      )}
      
      <div className="p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="font-sans text-2xl font-bold text-dark-slate group-hover:text-white transition-colors">
            {size} Funding
          </h3>
          <p className="text-sm font-medium mt-1 text-primary group-hover:text-secondary-text transition-colors">
            {formatInr(accountValue)}
          </p>
        </div>

        <div className="mb-5">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-dark-slate group-hover:text-white transition-colors">
              {formatInr(fee)}
            </span>
          </div>
          <p className="text-xs mt-1 text-body-text group-hover:text-secondary-text transition-colors">
            One-time evaluation fee
          </p>
        </div>

        <ul className="space-y-2.5 mb-6">
          {features.map((item, index) => (
            <li key={index} className="flex items-center gap-2.5">
              <div className="flex-shrink-0 rounded-full p-0.5 bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:text-white transition-colors">
                <CheckIcon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-xs text-body-text group-hover:text-secondary-text transition-colors">
                  {item.label}
                </span>
                <span className={`text-xs font-semibold ml-2 text-dark-slate group-hover:text-white transition-colors ${item.cap ? 'capitalize' : ''}`}>
                  {item.value}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <a href={checkoutLink} className="w-full mt-auto" onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="secondary" 
            className="w-full text-sm py-2.5 group-hover:bg-white group-hover:text-dark-slate transition-colors"
          >
            Start Evaluation
          </Button>
        </a>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
    const [mode, setMode] = useState<EvalMode>('2step');
    const [selectedSize, setSelectedSize] = useState<AccountSize | null>(null);
    const [shareText, setShareText] = useState('Share');

    useEffect(() => {
      const handleHashChange = () => {
          const hash = window.location.hash;
          const params = new URLSearchParams(hash.split('?')[1]);
          const modeParam = params.get('mode');
          if (modeParam === '1step' || modeParam === '2step') {
              setMode(modeParam);
          } else {
              setMode('2step'); // Default
          }
      };

      window.addEventListener('hashchange', handleHashChange);
      handleHashChange(); // Initial check

      return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleModeChange = (newMode: EvalMode) => {
        setMode(newMode);
        setSelectedSize(null); // Reset selection when mode changes
        const currentHash = window.location.hash.split('?')[0] || '#/pricing';
        const newHash = `${currentHash}?mode=${newMode}`;
        // Use replaceState for shallow routing effect
        history.replaceState(null, '', newHash);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShareText('Copied!');
            setTimeout(() => setShareText('Share'), 2000);
        });
    };

    const accountSizes = useMemo(() => Object.keys(PLANS.PLAN_SIZES) as AccountSize[], []);

    return (
        <div className="bg-background py-12 sm:py-16" id="pricing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-slate mb-3 max-w-4xl mx-auto">
                        Choose Your Evaluation Plan
                    </h2>
                    <p className="text-lg text-body-text max-w-2xl mx-auto">
                        Select the perfect funding size that matches your trading style and capital goals.
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center items-center mb-8">
                    <div className="bg-white p-1 rounded-lg shadow-md flex items-center border border-border-gray">
                        <button
                            onClick={() => handleModeChange('1step')}
                            className={`px-5 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                                mode === '1step'
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-dark-slate hover:text-primary'
                            }`}
                        >
                            1-Step
                        </button>
                        <button
                            onClick={() => handleModeChange('2step')}
                            className={`px-5 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                                mode === '2step'
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-dark-slate hover:text-primary'
                            }`}
                        >
                            2-Step
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative">
                    {accountSizes.map((size, index) => (
                        <PricingCard 
                            key={`${mode}-${size}`} 
                            size={size} 
                            mode={mode}
                            isSelected={selectedSize === size}
                            onSelect={() => setSelectedSize(size)}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="mt-2 text-xs text-secondary-text">
                        All prices are in INR. Taxes may apply. One-time evaluation fee required.
                    </p>
                </div>
            </div>
        </div>
    );
};

const FaqSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('General');
    const categories = Object.keys(FAQ_ITEMS);

    const activeItems: FaqItem[] = FAQ_ITEMS[activeTab] || [];

    return (
        <div className="bg-background pt-8 pb-16 sm:pt-12 sm:pb-24" id="faq">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-slate mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-body-text max-w-2xl mx-auto">
                        Everything You Need to Know!
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                    activeTab === category
                                        ? 'bg-dark-slate text-white shadow-md'
                                        : 'bg-white text-dark-slate border border-border-gray hover:bg-background hover:border-primary/30'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Accordion */}
                    <Accordion items={activeItems} />
                </div>
            </div>
        </div>
    );
};

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
