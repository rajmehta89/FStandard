import React from 'react';
import { Shield, TrendingUp, BarChart2, Calendar } from 'lucide-react';
import { KPI_DATA } from '../constants';

// Map icons to KPI items
const KPI_ICONS = [
  { Icon: Shield, color: '#003459', bgColor: 'rgba(0, 52, 89, 0.05)' },
  { Icon: TrendingUp, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.08)' },
  { Icon: BarChart2, color: '#003459', bgColor: 'rgba(0, 52, 89, 0.05)' },
  { Icon: Calendar, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.08)' },
];

const KpiSection: React.FC = () => {
    return (
        <div 
            id="kpi"
            className="kpi-section-container"
            style={{
                background: '#FFFFFF',
                padding: '100px 60px',
                marginTop: 0
            }}
        >
            <style>{`
                @media (max-width: 1023px) {
                    .kpi-section-container {
                        padding: 80px 40px !important;
                    }
                }
                @media (max-width: 639px) {
                    .kpi-section-container {
                        padding: 60px 24px !important;
                    }
                }
            `}</style>
            <div>
                <div 
                    className="mx-auto"
                    style={{
                        maxWidth: '1280px',
                        margin: '0 auto'
                    }}
                >
                    {/* Section Heading */}
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-slate mb-3">
                            Why Choose FStandard
                        </h2>
                        <p className="text-lg text-body-text max-w-2xl mx-auto">
                            Experience the benefits of trading with India's leading proprietary trading firm.
                        </p>
                    </div>
                    
                    {/* Cards Grid */}
                    <div 
                        className="kpi-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '40px'
                        }}
                    >
                        <style>{`
                            @media (max-width: 1023px) {
                                .kpi-grid {
                                    grid-template-columns: repeat(2, 1fr) !important;
                                    gap: 40px !important;
                                }
                            }
                            @media (max-width: 639px) {
                                .kpi-grid {
                                    grid-template-columns: 1fr !important;
                                    gap: 32px !important;
                                }
                            }
                        `}</style>
                        
                        {KPI_DATA.map((kpi, index) => {
                            const { Icon, color, bgColor } = KPI_ICONS[index];
                            return (
                                <div
                                    key={kpi.title}
                                    className="kpi-card"
                                    style={{
                                        background: '#FFFFFF',
                                        padding: '48px 32px',
                                        borderRadius: '16px',
                                        boxShadow: '0 4px 24px rgba(0, 52, 89, 0.08)',
                                        border: '1px solid rgba(226, 232, 240, 0.8)',
                                        minHeight: '320px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-6px)';
                                        e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 52, 89, 0.14)';
                                        e.currentTarget.style.borderColor = 'rgba(0, 52, 89, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 52, 89, 0.08)';
                                        e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
                                    }}
                                >
                                    {/* Icon Container */}
                                    <div 
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            background: bgColor,
                                            margin: '0 auto 24px auto'
                                        }}
                                    >
                                        <Icon size={56} color={color} />
                                    </div>
                                    
                                    {/* Card Heading */}
                                    <h3 
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            color: '#003459',
                                            marginBottom: '16px',
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {kpi.title}
                                    </h3>
                                    
                                    {/* Card Description */}
                                    <p 
                                        style={{
                                            fontSize: '16px',
                                            color: '#64748B',
                                            lineHeight: 1.7,
                                            maxWidth: '260px',
                                            margin: '0 auto',
                                            textAlign: 'center',
                                            width: '100%'
                                        }}
                                    >
                                        {kpi.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KpiSection;
