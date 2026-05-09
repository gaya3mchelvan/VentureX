/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AgentId = 'analyst' | 'spy' | 'cfo' | 'cmo' | 'ops' | 'strategist';

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  label: string;
  description: string;
  avatar: string;
  prompt: string;
}

export interface FinancialData {
  investment: number;
  monthlyExpense: number;
  monthlyRevenue: number;
}

export interface StartupProfile {
  role: 'Founder' | 'Investor';
  domain: string;
  stage: string;
  category: string;
  industry: string;
  location: string;
  readiness: string;
  pitch: string;
  idea: string;
  portfolio: string;
  essentials: string;
  features: string;
}

export interface AnalysisState {
  isPending: boolean;
  result: string | null;
  error: string | null;
}
