export interface FaqItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
  category?: string;
}

export interface EquityData {
  day: number;
  balance: number;
}

export type UserRole = 'trader' | 'admin';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email?: string; password?: string; phone?: string; otp?: string; }) => Promise<void>;
  signup: (details: { email?: string; password?: string; phone?: string; otp?: string; }) => Promise<void>;
  logout: () => void;
  getAccessToken?: () => string | null;
}

// New types for the dynamic pricing plans
export type EvalMode = "1step" | "2step";
export type AccountSize = "5L" | "10L" | "20L" | "50L";

export interface PlanRule {
  profitTargetPct: number;
  maxLossPct: number;
  drawdownType: "trailing";
}