/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Target, 
  DollarSign, 
  Zap, 
  MapPin, 
  Cpu, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Loader2,
  ArrowRight,
  Network
} from 'lucide-react';
import { AGENTS } from './constants';
import { AgentId, AnalysisState, FinancialData, StartupProfile } from './types';
import { runAgent } from './services/geminiService';
import ReportViewer from './components/ReportViewer';
import { cn } from './lib/utils';

export default function App() {
  const [selectedAgent, setSelectedAgent] = useState<AgentId>('analyst');
  const [financials, setFinancials] = useState<FinancialData>({
    investment: 250000,
    monthlyExpense: 20000,
    monthlyRevenue: 5000
  });
  const [profile, setProfile] = useState<StartupProfile>({
    role: 'Founder',
    domain: 'AI Healthcare',
    stage: 'Seed',
    category: 'B2B SaaS',
    industry: 'HealthTech',
    location: 'Bangalore, India',
    readiness: 'MVP ready, early traction',
    pitch: 'We use AI to diagnose lung cancer with 99% accuracy.',
    idea: 'An AI-powered diagnostic tool for radiologists.',
    portfolio: 'Healthcare experience, ex-Google engineers.',
    essentials: 'Water, High-speed internet, nearby food, parking',
    features: 'Automated ROI modeling, cross-silo data ingestion, real-time diagnostic overlays'
  });
  const [analysis, setAnalysis] = useState<Record<AgentId, AnalysisState>>({
    analyst: { isPending: false, result: null, error: null },
    spy: { isPending: false, result: null, error: null },
    cfo: { isPending: false, result: null, error: null },
    cmo: { isPending: false, result: null, error: null },
    ops: { isPending: false, result: null, error: null },
    strategist: { isPending: false, result: null, error: null },
  });

  const activeAgent = AGENTS.find(a => a.id === selectedAgent)!;

  const getRefinedPitch = () => {
    try {
      const result = analysis.analyst.result;
      if (!result) return null;
      const data = JSON.parse(result);
      return data.improved_pitch;
    } catch (e) {
      return null;
    }
  };

  const handleAnalyze = async () => {
    setAnalysis(prev => ({
      ...prev,
      [selectedAgent]: { ...prev[selectedAgent], isPending: true, error: null }
    }));

    try {
      const refinedPitch = getRefinedPitch();
      let finalUserPrompt = `
[SHARED CONTEXT]
- Industry: ${profile.industry}
- Domain: ${profile.domain}
- Location: ${profile.location}
${refinedPitch ? `- REFINED PITCH: ${refinedPitch}` : ''}
`;
      
      switch(selectedAgent) {
        case 'analyst':
          finalUserPrompt += `
FOUNDER INPUT:
- Pitch: ${profile.pitch}
- Idea: ${profile.idea}
- Financials: Investment: $${financials.investment}, Revenue: $${financials.monthlyRevenue}
- Portfolio: ${profile.portfolio}`;
          break;
        case 'spy':
          finalUserPrompt += `
Identify real competitors and market gaps for this specific venture. Focus on local and global players.`;
          break;
        case 'cfo':
          finalUserPrompt += `
Context: Investment: $${financials.investment}, Monthly Spend: $${financials.monthlyExpense}, Revenue: $${financials.monthlyRevenue}.
Calculated Runway: ${calculateRunway()}. Generate Financial Health Report. Focus on burn rate vs milestone timing.`;
          break;
        case 'cmo':
          finalUserPrompt += `
STARTUP NAME: VentureX AI
BUDGET: $${financials.monthlyExpense * 0.2} (Projected marketing budget).
Provide quick wins and acquisition strategy.`;
          break;
        case 'ops':
          finalUserPrompt += `
REQUIREMENTS:
- City/Locality: ${profile.location}
- Rent Budget: $${financials.monthlyExpense * 0.3}
- Essentials: ${profile.essentials}
Find real coworking listings.`;
          break;
        case 'strategist':
          finalUserPrompt += `
USER ROLE: ${profile.role}
FOCUS DOMAIN: ${profile.domain}
${profile.role === 'Founder' ? `STARTUP DETAILS:
- Pitch: ${profile.pitch}
- Features: ${profile.features}
` : ''}
Find upcoming industry events, hosting investors, and networking nodes in ${profile.location}.`;
          break;
      }

      const tools = (selectedAgent === 'spy' || selectedAgent === 'ops' || selectedAgent === 'strategist') ? [{ googleSearch: {} }] : undefined;
      const result = await runAgent(activeAgent.prompt, finalUserPrompt, tools, "application/json");
      
      setAnalysis(prev => ({
        ...prev,
        [selectedAgent]: { isPending: false, result, error: null }
      }));
    } catch (err) {
      setAnalysis(prev => ({
        ...prev,
        [selectedAgent]: { isPending: false, result: null, error: (err as Error).message }
      }));
    }
  };

  const calculateRunway = () => {
    const netBurn = financials.monthlyExpense - financials.monthlyRevenue;
    if (netBurn <= 0) return "Indefinite (Profitable)";
    const runway = financials.investment / netBurn;
    return `${runway.toFixed(1)} months`;
  };

  const getAgentIcon = (id: AgentId) => {
    switch (id) {
      case 'analyst': return <Target className="w-4 h-4" />;
      case 'spy': return <Cpu className="w-4 h-4" />;
      case 'cfo': return <DollarSign className="w-4 h-4" />;
      case 'cmo': return <Zap className="w-4 h-4" />;
      case 'ops': return <MapPin className="w-4 h-4" />;
      case 'strategist': return <Network className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 relative" id="app-root">
      {/* Background Blooms */}
      <div className="bg-blobs">
        <div className="blob-1" />
        <div className="blob-2" />
        <div className="blob-3" />
      </div>

      {/* Sidebar / Rail */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white/[0.02] border-r border-white/10 backdrop-blur-2xl z-40 hidden md:flex flex-col" id="sidebar">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-xl text-white">VentureX <span className="text-cyan-400">AI</span></span>
          </div>

          <nav className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-4">Core Modules</div>
            {AGENTS.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-sm font-medium border",
                  selectedAgent === agent.id 
                    ? "bg-white/10 text-white border-white/10 shadow-xl shadow-cyan-500/5 translate-x-1" 
                    : "text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-300"
                )}
                id={`nav-${agent.id}`}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  selectedAgent === agent.id ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-slate-600 group-hover:bg-slate-400"
                )} />
                {agent.label}
                {selectedAgent === agent.id && <ArrowRight className="ml-auto w-3 h-3 text-cyan-400" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 backdrop-blur-md" id="status-card">
          <div className="text-[10px] text-indigo-300 font-bold uppercase mb-1 tracking-wider">Active Engine</div>
          <div className="text-xs font-mono text-indigo-100 mb-2">Gemini 1.5 Flash</div>
          <div className="flex items-center gap-2">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[84%] h-full bg-indigo-400"></div>
            </div>
            <span className="text-[10px] font-mono text-indigo-300">84%</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-6 lg:p-12 min-h-screen" id="main-content">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="w-8 h-[1px] bg-cyan-400/30" />
                Strategic Console Active
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {activeAgent.role}
              </h1>
              <p className="text-slate-400 text-lg max-w-xl">{activeAgent.description}</p>
            </div>
            <div className="flex gap-4">
              <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-xs backdrop-blur-sm shadow-xl">
                <span className="text-slate-500 font-medium">Session IP:</span>
                <span className="text-white font-mono opacity-80">192.168.1.442</span>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4" id="stats-grid">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-cyan-500/20 transition-colors">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Live Runway</div>
              <div className="text-2xl font-bold text-cyan-400 font-mono">{calculateRunway()}</div>
              <div className="text-[10px] text-red-400/60 mt-1 font-mono italic">Audit result: Stable</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-white/20 transition-colors">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Burn Rate</div>
              <div className="text-2xl font-bold text-white font-mono">${financials.monthlyExpense.toLocaleString()}</div>
              <div className="text-[10px] text-slate-600 mt-1 font-mono">Optimized baseline</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-emerald-500/20 transition-colors">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Monthly Rev</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">${financials.monthlyRevenue.toLocaleString()}</div>
              <div className="text-[10px] text-emerald-500/40 mt-1 font-mono">+12% trend</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-indigo-500/20 transition-colors">
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Capital Score</div>
              <div className="text-2xl font-bold text-indigo-300 font-mono">A-</div>
              <div className="text-[10px] text-slate-600 mt-1 font-mono">Series A Ready</div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-8" id="action-area">
            {/* Input Side */}
            <div className="lg:w-[45%] space-y-6">
              <div className="glass-panel p-8 rounded-3xl shadow-2xl relative overflow-hidden" id="input-container">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
                
                {selectedAgent === 'cfo' ? (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Financial Inputs</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Total Investment</label>
                        <input 
                          type="number" 
                          value={financials.investment}
                          onChange={(e) => setFinancials({...financials, investment: Number(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Monthly OpEx</label>
                        <input 
                          type="number" 
                          value={financials.monthlyExpense}
                          onChange={(e) => setFinancials({...financials, monthlyExpense: Number(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Monthly Revenue</label>
                        <input 
                          type="number" 
                          value={financials.monthlyRevenue}
                          onChange={(e) => setFinancials({...financials, monthlyRevenue: Number(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : selectedAgent === 'analyst' ? (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Pitch Overhaul</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Raw Pitch</label>
                        <textarea 
                          value={profile.pitch}
                          onChange={(e) => setProfile({...profile, pitch: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans text-white min-h-[80px]"
                          placeholder="Your quick elevator pitch..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">The Idea</label>
                        <textarea 
                          value={profile.idea}
                          onChange={(e) => setProfile({...profile, idea: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans text-white min-h-[80px]"
                          placeholder="Core business logic..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Portfolio / Background</label>
                        <textarea 
                          value={profile.portfolio}
                          onChange={(e) => setProfile({...profile, portfolio: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans text-white min-h-[80px]"
                          placeholder="Why you?"
                        />
                      </div>
                    </div>
                  </div>
                ) : selectedAgent === 'ops' ? (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Workspace Criteria</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Target Location</label>
                        <input 
                          type="text" 
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Essentials (Amenity Filters)</label>
                        <textarea 
                          value={profile.essentials}
                          onChange={(e) => setProfile({...profile, essentials: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans text-white min-h-[100px]"
                          placeholder="What do you need? (Water, Internet, Food...)"
                        />
                      </div>
                    </div>
                  </div>
                ) : selectedAgent === 'strategist' ? (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Ecosystem Parameters</h3>
                    <div className="space-y-4">
                      <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                        {(['Founder', 'Investor'] as const).map(role => (
                          <button
                            key={role}
                            onClick={() => setProfile({...profile, role})}
                            className={cn(
                              "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                              profile.role === role ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
                            )}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Search Domain / Theme</label>
                          <input 
                            type="text" 
                            value={profile.domain}
                            onChange={(e) => setProfile({...profile, domain: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white text-sm"
                            placeholder="e.g., Biotech, FinTech..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Target City</label>
                          <input 
                            type="text" 
                            value={profile.location}
                            onChange={(e) => setProfile({...profile, location: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white text-sm"
                          />
                        </div>
                      </div>
                      {profile.role === 'Founder' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Key Features (for host matching)</label>
                          <textarea 
                            value={profile.features}
                            onChange={(e) => setProfile({...profile, features: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans text-white text-sm min-h-[60px]"
                            placeholder="List your unique selling points..."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Market Context</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Domain / Niche</label>
                        <input 
                          type="text" 
                          value={profile.domain}
                          onChange={(e) => setProfile({...profile, domain: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Target Industry</label>
                        <input 
                          type="text" 
                          value={profile.industry}
                          onChange={(e) => setProfile({...profile, industry: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-8 mt-4 border-t border-white/5">
                  <button 
                    onClick={handleAnalyze}
                    disabled={analysis[selectedAgent].isPending}
                    className="w-full bg-gradient-to-tr from-indigo-600 to-cyan-500 hover:brightness-110 disabled:grayscale disabled:opacity-30 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-500/20 group"
                  >
                    {analysis[selectedAgent].isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Intelligence...</span>
                      </>
                    ) : (
                      <>
                        <span>Command Execution</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-400/10 text-indigo-200 text-sm italic backdrop-blur-sm">
                "Intelligence Note: The {activeAgent.id} agent utilizes proprietary VentureX kernels to dissect {selectedAgent === 'cfo' ? 'liquidity risk' : 'strategic gaps'} in real-time."
              </div>
            </div>

            {/* Results Side */}
            <div className="flex-1 min-h-0">
              <AnimatePresence mode="wait">
                {analysis[selectedAgent].error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-panel p-8 rounded-3xl flex items-start gap-4 border-red-500/20"
                  >
                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h3 className="font-bold text-red-500">Security / Protocol Halt</h3>
                      <p className="text-red-300 text-sm opacity-80 font-mono uppercase tracking-tighter">{analysis[selectedAgent].error}</p>
                    </div>
                  </motion.div>
                )}

                {analysis[selectedAgent].isPending ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[400px] glass-panel rounded-3xl flex flex-col items-center justify-center text-center p-8 border-cyan-500/10"
                  >
                    <div className="relative mb-8">
                      <div className="w-20 h-20 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-cyan-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em] mb-3 animate-pulse">Scanning Neural Paths</div>
                    <p className="text-slate-500 text-sm max-w-xs font-mono">
                      Accessing {selectedAgent === 'spy' || selectedAgent === 'ops' || selectedAgent === 'strategist' ? 'global search index' : 'VentureX proprietary dataset'}...
                    </p>
                  </motion.div>
                ) : analysis[selectedAgent].result ? (
                  <div id="results-display" className="h-full relative">
                    {getRefinedPitch() && selectedAgent !== 'analyst' && (
                      <div className="absolute top-16 right-10 z-10">
                        <div className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full flex items-center gap-2 backdrop-blur-md">
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Coordinated Intel Active</span>
                        </div>
                      </div>
                    )}
                    <ReportViewer 
                      content={analysis[selectedAgent].result!} 
                      agentName={activeAgent.name} 
                    />
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-[400px] glass-panel rounded-3xl flex flex-col items-center justify-center text-center p-8 opacity-40 border-dashed"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                      <Target className="w-8 h-8 text-slate-500" />
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.25em] mb-2">Protocol Pending</div>
                    <p className="text-slate-600 text-sm max-w-xs">No analysis has been initiated for this sector. Please provide inputs to generate a detailed intelligence report.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/[0.03] border-t border-white/10 backdrop-blur-xl md:hidden z-50 px-4 flex items-center justify-around" id="mobile-nav">
        {AGENTS.map(agent => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent.id)}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              selectedAgent === agent.id ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_#22d3ee50]" : "text-slate-500 hover:text-slate-300"
            )}
          >
            {getAgentIcon(agent.id)}
          </button>
        ))}
      </div>
    </div>
  );
}
