import React from 'react';
import { Button } from './ui';

const HeroSection: React.FC = () => {
  return (
    <div id="hero" className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      <div className="max-w-[1200px] mx-auto hero-outer-container" style={{ padding: '80px 40px' }}>
        <style>{`
          @media (max-width: 767px) {
            .hero-outer-container {
              padding: 32px 20px 48px 20px !important;
            }
            .hero-container {
              gap: 32px !important;
            }
            .hero-left-section {
              gap: 32px !important;
              align-items: center !important;
            }
            .hero-badge {
              margin-bottom: 0 !important;
            }
            .hero-headline {
              font-size: 40px !important;
              line-height: 1.15 !important;
              margin-bottom: 16px !important;
              letter-spacing: -0.02em !important;
              font-weight: 800 !important;
              text-align: center !important;
            }
            @media (max-width: 400px) {
              .hero-headline {
                font-size: 36px !important;
              }
            }
            .hero-headline span {
              white-space: normal !important;
              display: block;
            }
            .hero-subtitle {
              font-size: 15px !important;
              line-height: 1.6 !important;
              margin-bottom: 32px !important;
              padding: 0 !important;
              text-align: center !important;
              color: #64748B !important;
              max-width: 100% !important;
            }
            .hero-stats {
              gap: 0 !important;
              margin: 0 0 36px 0 !important;
              padding: 24px 0 !important;
              width: 100% !important;
              justify-content: space-between !important;
            }
            .hero-stats > div {
              padding: 0 4px !important;
              min-width: 0 !important;
              flex: 1 !important;
            }
            .hero-stats-number {
              font-size: 24px !important;
              margin-bottom: 4px !important;
              font-weight: 800 !important;
            }
            .hero-stats-label {
              font-size: 10px !important;
              line-height: 1.4 !important;
              font-weight: 500 !important;
              white-space: nowrap !important;
            }
            .hero-buttons {
              gap: 12px !important;
              margin-top: 0 !important;
              width: 100% !important;
            }
            .hero-buttons a {
              width: 100% !important;
            }
            .hero-buttons button {
              width: 100% !important;
              padding: 14px 24px !important;
              font-size: 16px !important;
              font-weight: 600 !important;
            }
            .hero-trust {
              margin-top: 28px !important;
              gap: 12px 16px !important;
              justify-content: center !important;
              padding-top: 0 !important;
            }
            .hero-trust > div {
              font-size: 12px !important;
              font-weight: 500 !important;
            }
          }
        `}</style>
        <div className="hero-container flex flex-col lg:flex-row justify-between items-center gap-[60px]">
          {/* Left Section */}
          <div className="hero-left-section w-full flex flex-col gap-6 sm:gap-8">
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-[24px] w-fit mx-auto sm:mx-0" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#10B981' }}></div>
              <span className="text-xs sm:text-sm font-semibold text-center sm:text-left" style={{ color: '#10B981' }}>Join 500+ Funded Traders</span>
            </div>
            <h1 className="hero-headline text-[38px] sm:text-[44px] lg:text-[72px] font-bold leading-[1.08] m-0 max-w-[650px] tracking-[-0.03em] text-center sm:text-left">
              <span className="text-primary block">Trade Your Capital</span>
              <span className="text-success block">Keep Your Profits</span>
            </h1>
            <p className="hero-subtitle text-base sm:text-lg md:text-xl text-body-text text-center sm:text-left max-w-[600px] mx-auto sm:mx-0">
              <span className="block sm:inline">No personal risk. No capital required.</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline">Pass our evaluation and start trading our capital.</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline">Withdraw profits every 20 days.</span>
            </p>
            
            {/* Stats Row */}
            <div className="hero-stats flex flex-row justify-between items-center w-full max-w-[500px] mx-auto sm:max-w-none sm:mx-0">
              <div className="flex flex-col items-center justify-center text-center flex-1 px-2 sm:px-5">
                <div className="hero-stats-number text-[24px] sm:text-[32px] font-extrabold text-primary leading-none mb-1">₹5+ Cr</div>
                <div className="hero-stats-label text-[10px] sm:text-[13px] text-body-text font-medium">Capital Funded</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-gray flex-shrink-0"></div>
              <div className="flex flex-col items-center justify-center text-center flex-1 px-2 sm:px-5">
                <div className="hero-stats-number text-[24px] sm:text-[32px] font-extrabold text-primary leading-none mb-1">500+</div>
                <div className="hero-stats-label text-[10px] sm:text-[13px] text-body-text font-medium">Active Traders</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-gray flex-shrink-0"></div>
              <div className="flex flex-col items-center justify-center text-center flex-1 px-2 sm:px-5">
                <div className="hero-stats-number text-[24px] sm:text-[32px] font-extrabold text-primary leading-none mb-1">₹12L</div>
                <div className="hero-stats-label text-[10px] sm:text-[13px] text-body-text font-medium">Avg. Payout</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border-gray flex-shrink-0"></div>
              <div className="flex flex-col items-center justify-center text-center flex-1 px-2 sm:px-5">
                <div className="hero-stats-number text-[24px] sm:text-[32px] font-extrabold text-primary leading-none mb-1">20 Days</div>
                <div className="hero-stats-label text-[10px] sm:text-[13px] text-body-text font-medium">Payout Cycle</div>
              </div>
            </div>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#/signup" className="w-full sm:w-auto"><Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg py-3.5 sm:py-3">Start Evaluation</Button></a>
              <a href="#rules" className="w-full sm:w-auto"><Button variant="outline" className="w-full sm:w-auto text-base sm:text-lg py-3.5 sm:py-3">View Rules</Button></a>
            </div>

            {/* Trust Indicators */}
            <div className="hero-trust flex flex-wrap gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm justify-center sm:justify-start" style={{ color: '#64748B' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-bold" style={{ color: '#10B981' }}>✓</span>
                <span>SEBI Registered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-bold" style={{ color: '#10B981' }}>✓</span>
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-bold" style={{ color: '#10B981' }}>✓</span>
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

