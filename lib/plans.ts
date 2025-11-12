import type { EvalMode, AccountSize, PlanRule } from '../types';

export const PLAN_SIZES: Record<AccountSize, number> = {
  "5L": 500000,
  "10L": 1000000,
  "20L": 2000000,
  "50L": 5000000,
};

export const PRICING: Record<EvalMode, Record<AccountSize, number>> = {
  "1step": { "5L": 7999, "10L": 14999, "20L": 23000, "50L": 49999 },
  "2step": { "5L": 6999, "10L": 12999, "20L": 23000, "50L": 45999 },
};

export const RULES: Record<EvalMode, PlanRule> = {
  "1step": { profitTargetPct: 10, maxLossPct: 6, drawdownType: "trailing" },
  "2step": { profitTargetPct: 8, maxLossPct: 6, drawdownType: "trailing" },
};

export const PLANS = {
    PLAN_SIZES,
    PRICING,
    RULES
};
