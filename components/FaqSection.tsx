import React, { useState } from 'react';
import { Accordion } from './ui';
import { FAQ_ITEMS } from '../constants';
import type { FaqItem } from '../types';

const FaqSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('General');
    const categories = Object.keys(FAQ_ITEMS);

    const activeItems: FaqItem[] = FAQ_ITEMS[activeTab] || [];

    return (
        <div className="bg-white py-20 sm:py-24" id="faq" style={{ background: '#F8FAFC' }}>
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
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                                    activeTab === category
                                        ? 'bg-dark-slate text-white shadow-lg'
                                        : 'bg-white text-dark-slate border border-border-gray hover:bg-background hover:border-primary/30'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Accordion */}
                    <Accordion key={activeTab} items={activeItems} />
                </div>
            </div>
        </div>
    );
};

export default FaqSection;

