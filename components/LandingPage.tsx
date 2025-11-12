import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Accordion } from './ui';
import { KPI_DATA, HOW_IT_WORKS_STEPS, FAQ_ITEMS } from '../constants';
import { PLANS } from '../lib/plans';
import type { EvalMode, AccountSize } from '../types';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
        </div>
        <div className="relative z-10 text-center md:text-left md:w-3/5">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-extrabold text-ink tracking-tight">
            Trade Our Capital. <br/>
            <span className="text-primary">Keep Your Profits.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            FStandard is India’s first institutional-grade dual-asset proprietary trading firm, empowering disciplined traders with the capital they need to succeed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
             <a href="#/signup"><Button variant="primary" className="text-lg">Start Evaluation</Button></a>
             <a href="#rules"><Button variant="outline" className="text-lg">View Rules</Button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiSection: React.FC = () => {
    return (
        <div className="bg-background py-16 sm:py-24" id="kpi">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {KPI_DATA.map(kpi => (
                        <Card key={kpi.title} className="text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <h3 className="font-serif text-3xl font-bold text-primary">{kpi.title}</h3>
                            <p className="mt-2 text-gray-600">{kpi.description}</p>
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
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink">Your Journey to Funding</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">A simple, transparent, and fair process designed for serious traders.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {HOW_IT_WORKS_STEPS.map(step => (
            <div key={step.step} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white font-bold text-2xl mx-auto">
                {step.step}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatInr = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

const PricingCard: React.FC<{ size: AccountSize, mode: EvalMode }> = ({ size, mode }) => {
  const accountValue = PLANS.PLAN_SIZES[size];
  const fee = PLANS.PRICING[mode][size];
  const rules = PLANS.RULES[mode];

  const checkoutLink = `#/checkout?mode=${mode}&size=${size}`;

  return (
    <Card className="flex flex-col h-full border-2 border-transparent hover:border-primary transition-all duration-300">
      <h3 className="font-serif text-3xl font-bold text-ink">{size} Funding</h3>
      <p className="text-primary font-semibold mt-1">{formatInr(accountValue)}</p>

      <div className="my-6 text-center">
        <span className="text-5xl font-bold">{formatInr(fee)}</span>
        <span className="text-gray-500"> / one-time fee</span>
      </div>

      <ul className="space-y-4 text-gray-700 flex-grow">
        {[
          { label: 'Profit Target', value: `${rules.profitTargetPct}%` },
          { label: 'Max Loss', value: `${rules.maxLossPct}%` },
          { label: 'Drawdown Type', value: rules.drawdownType, cap: true },
          { label: 'Payout Cycle', value: '20 Days' },
          { label: 'News Trading', value: 'Allowed' },
          { label: 'Weekend Holding', value: 'Allowed' },
        ].map(item => (
          <li key={item.label} className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{item.label}</span>
            <span className={`font-semibold ${item.cap ? 'capitalize' : ''}`}>{item.value}</span>
          </li>
        ))}
      </ul>

      <a href={checkoutLink} className="w-full mt-8 block">
        <Button variant="secondary" className="w-full">Start Evaluation</Button>
      </a>
    </Card>
  );
};

const PricingSection: React.FC = () => {
    const [mode, setMode] = useState<EvalMode>('2step');
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
        <div className="bg-background py-16 sm:py-24" id="pricing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink">Find Your Fit</h2>
                    <p className="mt-4 text-lg text-gray-600">Choose an evaluation program that aligns with your trading strategy and goals.</p>
                </div>

                <div className="mt-10 flex justify-center items-center gap-4">
                     <div className="bg-white p-1 rounded-2xl shadow-md flex items-center">
                        <Button variant={mode === '1step' ? 'primary' : 'secondary'} onClick={() => handleModeChange('1step')} className={`w-32 ${mode !== '1step' && 'bg-gray-100 !text-ink hover:bg-gray-200'}`}>1-Step</Button>
                        <Button variant={mode === '2step' ? 'primary' : 'secondary'} onClick={() => handleModeChange('2step')} className={`w-32 ${mode !== '2step' && 'bg-gray-100 !text-ink hover:bg-gray-200'}`}>2-Step</Button>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {accountSizes.map(size => (
                        <PricingCard key={`${mode}-${size}`} size={size} mode={mode} />
                    ))}
                </div>
                 <div className="text-center mt-8">
                    <button onClick={handleShare} className="text-sm text-gray-500 hover:text-primary flex items-center gap-2 mx-auto">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                        {shareText}
                    </button>
                    <p className="mt-2 text-xs text-gray-400">Illustrative fees. Taxes may apply.</p>
                 </div>
            </div>
        </div>
    );
};

const FaqSection: React.FC = () => {
    return (
        <div className="bg-white py-16 sm:py-24" id="faq">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink">Frequently Asked Questions</h2>
                </div>
                <div className="mt-12 max-w-4xl mx-auto">
                    <Accordion items={FAQ_ITEMS} />
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
