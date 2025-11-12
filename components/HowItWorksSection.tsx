import React, { useEffect, useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';

const HowItWorksSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="how-it-works-container"
      id="how-it-works"
      style={{
        background: '#FFFFFF',
        padding: '100px 60px',
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .how-it-works-card {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .how-it-works-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .how-it-works-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .how-it-works-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .number-circle {
          transition: all 0.3s ease;
        }
        .how-it-works-card:hover .number-circle {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(0, 52, 89, 0.25);
        }
        .connector-line {
          position: absolute;
          top: 40px;
          width: calc((100% - 240px) / 2);
          height: 2px;
          background: linear-gradient(90deg, #003459 0%, #E2E8F0 100%);
          z-index: 0;
        }
        .connector-line-1 {
          left: calc(33.333% + 40px);
        }
        .connector-line-2 {
          left: calc(66.666% + 40px);
        }
        @media (max-width: 1023px) {
          .how-it-works-container {
            padding: 80px 40px !important;
          }
          .connector-line {
            display: none;
          }
        }
        @media (max-width: 639px) {
          .how-it-works-container {
            padding: 60px 24px !important;
          }
        }
      `}</style>
      
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative'
        }}
      >

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-slate mb-3">
            Your Journey to Funding
          </h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            A simple, transparent, and fair process designed for serious traders.
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          className="how-it-works-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          <style>{`
            @media (max-width: 1023px) {
              .how-it-works-grid {
                grid-template-columns: repeat(1, 1fr) !important;
                gap: 40px !important;
              }
            }
          `}</style>

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="how-it-works-card"
              style={{
                background: '#FFFFFF',
                padding: '48px 36px',
                borderRadius: '16px',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 4px 20px rgba(0, 52, 89, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '320px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 52, 89, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 52, 89, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 52, 89, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
              }}
            >
              {/* Number Circle */}
              <div 
                className="number-circle"
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#003459',
                  color: '#FFFFFF',
                  fontSize: '32px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  margin: '0 auto 32px auto',
                  boxShadow: '0 8px 24px rgba(0, 52, 89, 0.2)'
                }}
              >
                {step.step}
              </div>

              {/* Step Label */}
              <div 
                className="step-label"
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: '-24px',
                  marginBottom: '16px'
                }}
              >
                Step {step.step}
              </div>

              {/* Card Heading */}
              <h3 
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#003459',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2
                }}
              >
                {step.title}
              </h3>
              
              {/* Card Description */}
              <p 
                style={{
                  fontSize: '16px',
                  color: '#64748B',
                  lineHeight: 1.7,
                  maxWidth: '320px',
                  margin: '0 auto'
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
