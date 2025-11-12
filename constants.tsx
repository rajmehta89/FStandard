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

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is FStandard?",
    answer: "FStandard is India's first institutional-grade dual-asset proprietary trading firm. We provide capital to talented traders who can demonstrate their skills in a simulated environment."
  },
  {
    question: "What are the trading rules I need to follow?",
    answer: "Our key rules include a 6% trailing drawdown, a 1.5% risk-per-trade cap, and a 40% consistency rule. We encourage disciplined trading for long-term success. Full rules are available on our Rules page."
  },
  {
    question: "How often can I request a payout?",
    answer: "You are eligible for a payout every 20 trading days, provided your account is in profit. We support payouts via UPI and standard bank transfers for our Indian traders."
  },
  {
    question: "Can I trade both Forex and Crypto/Indices?",
    answer: "Yes! We are a dual-asset firm, allowing you to trade a wide range of instruments across FX, Cryptocurrencies, and major Indices to diversify your strategies."
  },
  {
    question: "Is mirror trading allowed?",
    answer: "We have a specific mirror-trading model. You can mirror trades from your own accounts, but copying signals from third-party services is prohibited. Please consult our rules for detailed guidelines."
  }
];

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