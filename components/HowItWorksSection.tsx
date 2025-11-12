import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';

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

export default HowItWorksSection;

