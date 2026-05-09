/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { FileText, Download, Share2, Globe, Users, Trophy, Rocket, LineChart, MessageSquare } from 'lucide-react';

interface ReportViewerProps {
  content: string;
  agentName: string;
}

export default function ReportViewer({ content, agentName }: ReportViewerProps) {
  const isJson = content.trim().startsWith('{');
  let jsonData: any = null;
  
  if (isJson) {
    try {
      jsonData = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse JSON content");
    }
  }

  const renderValue = (value: any) => {
    if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
      return (
        <a href={value} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1 group">
          View Listing <Share2 className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      );
    }
    return String(value);
  };

  const renderSection = (title: string, data: any, icon?: React.ReactNode) => {
    if (!data) return null;
    
    return (
      <div className="glass-card p-6 rounded-2xl border border-white/5 h-fit">
        <div className="flex items-center gap-3 mb-4 text-cyan-400">
          {icon || <Globe className="w-4 h-4" />}
          <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
        </div>
        {Array.isArray(data) ? (
          <ul className="space-y-4">
            {data.map((item: any, idx: number) => (
              <li key={idx} className="text-slate-300 text-sm leading-relaxed border-l-2 border-white/5 pl-4 py-1">
                {typeof item === 'object' ? (
                  <div className="space-y-2">
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] font-mono text-slate-500 uppercase block leading-none mb-1">{k.replace(/_/g, ' ')}</span>
                        <div className="text-slate-200">{renderValue(v)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-2 shrink-0" />
                    {renderValue(item)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : typeof data === 'object' ? (
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]: [string, any]) => (
              <div key={key} className="text-sm">
                <span className="text-slate-500 uppercase text-[10px] block mb-1 font-mono">{key.replace(/_/g, ' ')}</span>
                <span className="text-slate-300 leading-relaxed block">{renderValue(value)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-300 text-sm leading-loose">{renderValue(data)}</p>
        )}
      </div>
    );
  };

  const renderJsonReport = () => {
    if (!jsonData) return <div className="text-red-500 font-mono">Error parsing report intelligence.</div>;

    return (
      <div className="space-y-12">
        {/* Hero Section if applicable */}
        {(jsonData.improved_pitch || jsonData.refined_idea) && (
          <div className="space-y-8">
            {jsonData.improved_pitch && (
              <div className="p-8 rounded-3xl bg-cyan-500/10 border border-cyan-500/20">
                <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] mb-4">Upgraded Pitch</h2>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">"{jsonData.improved_pitch}"</p>
              </div>
            )}
            {jsonData.refined_idea && (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Refined Business Logic</h2>
                <p className="text-slate-300 leading-relaxed">{jsonData.refined_idea}</p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {Object.entries(jsonData).map(([key, value]) => {
            if (['improved_pitch', 'refined_idea', 'investor_readiness_score', 'infrastructure_score'].includes(key)) return null;
            
            let icon = <FileText className="w-4 h-4" />;
            if (key.includes('event')) icon = <Globe className="w-4 h-4" />;
            if (key.includes('market') || key.includes('competitor')) icon = <Trophy className="w-4 h-4" />;
            if (key.includes('growth') || key.includes('acquisition') || key.includes('quick_wins')) icon = <Rocket className="w-4 h-4" />;
            if (key.includes('investor') || key.includes('match') || key.includes('networking')) icon = <Users className="w-4 h-4" />;
            if (key.includes('revenue') || key.includes('monetization') || key.includes('burn')) icon = <LineChart className="w-4 h-4" />;
            
            return (
              <div key={key}>
                {renderSection(key.replace(/_/g, ' '), value, icon)}
              </div>
            );
          })}
        </div>

        {/* Scores / Metrics */}
        {(jsonData.investor_readiness_score !== undefined || jsonData.infrastructure_score !== undefined) && (
          <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
            {jsonData.investor_readiness_score !== undefined && (
              <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Investor Readiness</div>
                <div className="text-2xl font-bold text-cyan-400">{jsonData.investor_readiness_score}%</div>
              </div>
            )}
            {jsonData.infrastructure_score !== undefined && (
              <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Infra Score</div>
                <div className="text-2xl font-bold text-emerald-400">{jsonData.infrastructure_score}/100</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[400px]" id="report-container"
    >
      <div className="bg-white/5 px-8 py-5 border-b border-white/10 flex justify-between items-center backdrop-blur-md" id="report-header">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-slate-400">Intelligence Briefing • {agentName}</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400" title="Export Data">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400" title="Secure Link">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1 bg-white/[0.01]" id="report-content">
        {isJson ? renderJsonReport() : (
          <div className="prose prose-invert max-w-none prose-cyan prose-sm md:prose-base font-serif">
            <ReactMarkdown
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold mb-8 text-white tracking-tight italic border-b border-white/10 pb-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-xl font-bold mb-4 text-cyan-400 mt-10 tracking-wide uppercase font-sans text-sm">{children}</h2>,
                h3: ({children}) => <h3 className="text-lg font-bold mb-3 text-white mt-8 font-sans">{children}</h3>,
                p: ({children}) => <p className="text-slate-300 leading-loose mb-6 opacity-90">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-inside space-y-3 mb-8 text-slate-300">{children}</ul>,
                li: ({children}) => <li className="marker:text-cyan-500/50">{children}</li>,
                table: ({children}) => (
                  <div className="overflow-x-auto my-10 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <table className="w-full text-left text-sm font-sans">{children}</table>
                  </div>
                ),
                thead: ({children}) => <thead className="bg-white/5 border-b border-white/10 text-slate-500 uppercase text-[10px] font-black tracking-widest">{children}</thead>,
                th: ({children}) => <th className="px-6 py-4">{children}</th>,
                td: ({children}) => <td className="px-6 py-4 border-t border-white/5 text-slate-400">{children}</td>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div className="bg-white/5 px-10 py-4 border-t border-white/10 text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em] flex justify-between items-center" id="report-footer">
        <span>Restricted Access Protocol 0.82-X</span>
        <span>Verified {new Date().toLocaleTimeString()}</span>
      </div>
    </motion.div>
  );
}
