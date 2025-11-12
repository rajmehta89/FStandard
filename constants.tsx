import React from 'react';
import type { FaqItem, EquityData, User } from './types';

export const KPI_DATA = [
  { title: "6% Trailing Drawdown", description: "Your safety net for consistent growth." },
  { title: "70% Profit Share", description: "You keep the majority of your earnings." },
  { title: "Dual-Asset Coverage", description: "Trade FX, Crypto, and Indices." },
  { title: "20-Day Payouts", description: "Regular access to your profits." },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose Your Evaluation",
    description: "Select a plan that matches your trading style and capital goals. Start your journey with a clear path."
  },
  {
    step: 2,
    title: "Trade with Discipline",
    description: "Meet the profit targets while respecting our straightforward risk management rules. Consistency is key."
  },
  {
    step: 3,
    title: "Get Funded & Withdraw",
    description: "Successfully pass the evaluation to trade our capital. Withdraw your 70% profit share every 20 trading days."
  }
];

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    smiley: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ),
    cards: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    document: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    user: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    dollar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    envelope: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    chat: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    play: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
    chart: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
      </svg>
    ),
    api: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9h16"></path>
        <path d="M4 15h16"></path>
        <path d="M10 3L8 21"></path>
        <path d="M16 3l2 18"></path>
      </svg>
    ),
  };
  return icons[iconName] || icons.info;
};

export const FAQ_ITEMS: { [category: string]: FaqItem[] } = {
  General: [
    {
      question: "What is FStandard?",
      answer: "FStandard is India's first institutional-grade dual-asset proprietary trading firm. We provide capital to talented traders who can demonstrate their skills in a simulated environment. Our platform empowers disciplined traders with the capital they need to succeed.",
      icon: getIcon('smiley'),
      category: 'General'
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your evaluation plan at any time. Simply contact our support team, and they will guide you through the process. Note that plan changes may require restarting your evaluation.",
      icon: getIcon('cards'),
      category: 'General'
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your evaluation at any time. If you cancel before completing the evaluation, you won't be eligible for a refund. However, if you've already passed and are trading with our capital, standard withdrawal terms apply.",
      icon: getIcon('document'),
      category: 'General'
    },
    {
      question: "Can other info be added to my account?",
      answer: "Yes, you can update your account information including email, phone number, and banking details through your dashboard. For security reasons, some changes may require verification.",
      icon: getIcon('user'),
      category: 'General'
    },
  ],
  Pricing: [
    {
      question: "How does billing work?",
      answer: "We charge a one-time evaluation fee when you sign up. There are no monthly subscriptions or hidden fees. Once you pass the evaluation and start trading with our capital, you only pay a percentage of your profits (30% to us, 70% to you).",
      icon: getIcon('dollar'),
      category: 'Pricing'
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI, bank transfers, and major credit/debit cards for Indian traders. All payments are processed securely through our payment gateway partners.",
      icon: getIcon('dollar'),
      category: 'Pricing'
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparency. The only fee you pay is the one-time evaluation fee. There are no monthly charges, withdrawal fees, or hidden costs. You keep 70% of all profits you make.",
      icon: getIcon('dollar'),
      category: 'Pricing'
    },
    {
      question: "Can I get a refund?",
      answer: "Evaluation fees are non-refundable as they cover the cost of providing you with a trading account and platform access. However, if you successfully pass the evaluation, you'll have the opportunity to earn back much more than your initial investment.",
      icon: getIcon('dollar'),
      category: 'Pricing'
    },
  ],
  Dashboard: [
    {
      question: "How do I access my dashboard?",
      answer: "After signing up and completing your evaluation purchase, you'll receive login credentials via email. Simply visit our website and click 'Sign In' to access your personalized dashboard where you can track your progress, view statistics, and manage your account.",
      icon: getIcon('chart'),
      category: 'Dashboard'
    },
    {
      question: "What information is shown in my dashboard?",
      answer: "Your dashboard displays real-time equity curve, profit/loss statistics, trading days remaining, profit target progress, max loss limits, and withdrawal eligibility. You can also access market analysis tools and request payouts directly from the dashboard.",
      icon: getIcon('chart'),
      category: 'Dashboard'
    },
    {
      question: "How do I change my account email?",
      answer: "To change your account email, go to your dashboard settings, click on 'Account Information', and update your email address. You'll need to verify the new email address through a confirmation link sent to your new email.",
      icon: getIcon('envelope'),
      category: 'Dashboard'
    },
    {
      question: "Can I customize my dashboard view?",
      answer: "Currently, the dashboard view is standardized to ensure consistency. However, you can filter and sort data within each section. We're working on adding more customization options in future updates.",
      icon: getIcon('settings'),
      category: 'Dashboard'
    },
  ],
  API: [
    {
      question: "Do you provide API access?",
      answer: "Yes, we offer API access for advanced traders who want to integrate automated trading strategies. API documentation and access credentials are available in your dashboard under the 'API Settings' section after you've passed the evaluation.",
      icon: getIcon('api'),
      category: 'API'
    },
    {
      question: "How does support work?",
      answer: "We provide 24/7 email support and live chat during business hours (9 AM - 6 PM IST). For technical issues, our team typically responds within 2-4 hours. You can also access our knowledge base and FAQ section for common questions.",
      icon: getIcon('chat'),
      category: 'API'
    },
    {
      question: "Do you provide tutorials?",
      answer: "Yes, we offer comprehensive tutorials covering platform navigation, trading rules, risk management, and best practices. These are available in your dashboard under the 'Resources' section. We also host weekly webinars for our traders.",
      icon: getIcon('play'),
      category: 'API'
    },
    {
      question: "What trading platforms do you support?",
      answer: "We support MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms. Both platforms are available for download from your dashboard after account activation. Our API also supports custom integrations for advanced users.",
      icon: getIcon('api'),
      category: 'API'
    },
  ]
};

export const SAMPLE_EQUITY_DATA: EquityData[] = [
  { day: 1, balance: 100000 },
  { day: 2, balance: 101500 },
  { day: 3, balance: 100500 },
  { day: 4, balance: 102200 },
  { day: 5, balance: 103500 },
  { day: 6, balance: 103200 },
  { day: 7, balance: 104800 },
  { day: 8, balance: 106000 },
  { day: 9, balance: 105500 },
  { day: 10, balance: 107300 },
  { day: 11, balance: 108100 },
  { day: 12, balance: 109200 },
  { day: 13, balance: 108900 },
  { day: 14, balance: 110500 },
];

export const MOCK_USERS: User[] = [
    { id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@fstandard.in', role: 'trader', status: 'active' },
    { id: '2', name: 'Priya Patel', email: 'priya.patel@fstandard.in', role: 'admin', status: 'active' },
    { id: '3', name: 'Rohan Gupta', email: 'rohan.gupta@fstandard.in', role: 'trader', status: 'active' },
    { id: '4', name: 'Sanya Verma', email: 'sanya.verma@fstandard.in', role: 'trader', status: 'suspended' },
    { id: '5', name: 'Vikram Singh', email: 'vikram.singh@fstandard.in', role: 'trader', status: 'active' },
];