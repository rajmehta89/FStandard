import React, { useState, useEffect, useContext } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, Button } from '../components/ui';
import { SAMPLE_EQUITY_DATA } from '../constants';
import { generateMarketAnalysis } from '../services/geminiService';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../types';

const StatCard: React.FC<{ title: string, value: string, color?: string }> = ({ title, value, color = 'text-dark-slate' }) => (
    <div className="bg-background p-4 rounded-lg border border-border-gray">
        <p className="text-sm text-secondary-text">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

const EquityChart: React.FC = () => {
    const profitTarget = 110000;
    const maxLoss = 94000;
    const currentBalance = SAMPLE_EQUITY_DATA[SAMPLE_EQUITY_DATA.length - 1].balance;
    const progress = ((currentBalance - 100000) / (profitTarget - 100000)) * 100;

    return (
        <Card>
            <h3 className="text-2xl font-bold font-serif mb-4">Equity Curve</h3>
             <div className="w-full h-64 sm:h-72">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={SAMPLE_EQUITY_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" label={{ value: 'Trading Day', position: 'insideBottom', offset: -5 }}/>
                        <YAxis domain={['dataMin - 2000', 'dataMax + 2000']} tickFormatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                        <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, "Balance"]} />
                        <Legend />
                        <Line type="monotone" dataKey="balance" stroke="#0066A1" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4">
                <div className="flex justify-between text-sm font-medium text-body-text mb-1">
                    <span>Progress to Target</span>
                    <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-border-gray rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </Card>
    );
};

const MarketAnalysisWidget: React.FC = () => {
    const [topic, setTopic] = useState('NIFTY 50');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchAnalysis = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setError('');
        setAnalysis('');
        try {
            const result = await generateMarketAnalysis(topic);
            setAnalysis(result);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch analysis.');
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        handleFetchAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <h3 className="text-xl font-bold font-serif mb-4">Gemini Market Analysis</h3>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., EUR/USD"
                    className="flex-grow p-2 border border-border-gray rounded-lg focus:ring-primary focus:border-primary"
                />
                <Button onClick={handleFetchAnalysis} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                </Button>
            </div>
            {isLoading && <div className="text-center p-4">Loading analysis...</div>}
            {error && <div className="text-danger p-4 bg-danger/10 rounded-lg">{error}</div>}
            {analysis && <div className="p-4 bg-background rounded-lg text-body-text whitespace-pre-wrap border border-border-gray">{analysis}</div>}
        </Card>
    )
}

const TraderDashboardPage: React.FC = () => {
    const { user } = useContext(AuthContext) as AuthContextType;

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="font-serif text-3xl sm:text-4xl font-bold">Trader Dashboard</h1>
                        <p className="text-body-text">Welcome back, {user?.email || 'Trader'}!</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                       <EquityChart />
                       <MarketAnalysisWidget />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card>
                            <h3 className="text-xl font-bold font-serif mb-4">Account Metrics</h3>
                            <div className="grid grid-cols-2 gap-4">
                               <StatCard title="Profit Target" value="₹1,10,000" color="text-success" />
                               <StatCard title="Max Loss Limit" value="₹94,000" color="text-danger" />
                               <StatCard title="Lot Size Cap" value="10 Lots" />
                               <StatCard title="Days Traded" value="14" />
                            </div>
                        </Card>
                        <Card>
                           <h3 className="text-xl font-bold font-serif mb-4">Withdrawals</h3>
                           <div className="bg-background border border-success/20 text-success p-4 rounded-lg text-center">
                               <p className="font-semibold">Congratulations!</p>
                               <p>You are eligible for a payout.</p>
                               <Button className="mt-4" variant='secondary'>Request Payout</Button>
                           </div>
                        </Card>
                        <Card>
                           <h3 className="text-xl font-bold font-serif mb-4">Refer & Earn</h3>
                           <p className="text-body-text mb-2">Share your link and earn a commission on successful referrals.</p>
                           <div className="flex items-center p-2 bg-background border border-border-gray rounded-lg">
                               <input type="text" readOnly value="fstandard.in/r/TRDR123" className="bg-transparent flex-grow outline-none"/>
                               <button className="text-hover-blue font-semibold hover:text-primary">Copy</button>
                           </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TraderDashboardPage;