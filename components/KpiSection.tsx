import React from 'react';
import { Card } from './ui';
import { KPI_DATA } from '../constants';

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

export default KpiSection;

