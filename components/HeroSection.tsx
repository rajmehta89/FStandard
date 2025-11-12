import React from 'react';
import { Button } from './ui';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      <div className="max-w-[1200px] mx-auto" style={{ padding: '80px 40px' }}>
        <style>{`
          @media (max-width: 767px) {
            .hero-container {
              padding: 60px 24px !important;
            }
          }
        `}</style>
        <div className="hero-container flex flex-col lg:flex-row justify-between items-center gap-[60px]">
          {/* Left Section */}
          <div className="w-full lg:w-[55%] flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[24px] w-fit" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#10B981' }}></div>
              <span className="text-sm font-medium" style={{ color: '#10B981' }}>Join 500+ Funded Traders Across India</span>
            </div>
            <h1 className="text-[44px] lg:text-[72px] font-bold leading-[1.1] m-0 max-w-[650px] tracking-[-0.02em]">
              <span className="text-primary whitespace-nowrap">Trade Your Capital</span><br />
              <span className="text-success whitespace-nowrap">Keep Your Profits</span>
            </h1>
            <p className="text-lg md:text-xl text-body-text">
              No personal risk. No capital required. Pass our evaluation and start trading our capital. Withdraw profits every 20 days.
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
              <div className="flex flex-col items-center justify-center text-center flex-1 px-5">
                <div className="text-[32px] font-bold text-primary leading-none mb-1">₹5+ Cr</div>
                <div className="text-[13px] text-body-text font-normal whitespace-nowrap">Capital Funded</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-gray flex-shrink-0"></div>
              <div className="flex flex-col items-center justify-center text-center flex-1 px-5">
                <div className="text-[32px] font-bold text-primary leading-none mb-1">500+</div>
                <div className="text-[13px] text-body-text font-normal whitespace-nowrap">Active Traders</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-gray flex-shrink-0"></div>
              <div className="flex flex-col items-center justify-center text-center flex-1 px-5">
                <div className="text-[32px] font-bold text-primary leading-none mb-1">₹12L</div>
                <div className="text-[13px] text-body-text font-normal whitespace-nowrap">Avg. Payout</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-gray flex-shrink-0"></div>
              <div className="flex flex-col items-center justify-center text-center flex-1 px-5">
                <div className="text-[32px] font-bold text-primary leading-none mb-1">20 Days</div>
                <div className="text-[13px] text-body-text font-normal whitespace-nowrap">Payout Cycle</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#/signup"><Button variant="primary" className="text-lg">Start Evaluation</Button></a>
              <a href="#rules"><Button variant="outline" className="text-lg">View Rules</Button></a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 mt-6 text-sm" style={{ color: '#64748B' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold" style={{ color: '#10B981' }}>✓</span>
                <span>SEBI Registered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold" style={{ color: '#10B981' }}>✓</span>
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold" style={{ color: '#10B981' }}>✓</span>
                <span>500+ Funded</span>
              </div>
            </div>
          </div>

          {/* Right Section - Auto-scrolling Mockup Showcase */}
          <div 
            className="hidden lg:block w-full lg:w-[45%] relative overflow-hidden" 
            style={{ 
              height: '600px', 
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          >
            <style>{`
              @keyframes scrollUp {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              .scrolling-container {
                display: flex;
                flex-direction: column;
                gap: 32px;
                animation: scrollUp 25s linear infinite;
              }
              .scrolling-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="scrolling-container">
              {/* First set of 4 cards */}
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Duplicated set for seamless loop */}
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full max-w-[480px] mx-auto p-8 bg-white rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0, 52, 89, 0.12)' }}>
                <div className="h-[250px] rounded-xl overflow-hidden">
                  <img src="/images/image1.png" alt="Mockup showcase" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

