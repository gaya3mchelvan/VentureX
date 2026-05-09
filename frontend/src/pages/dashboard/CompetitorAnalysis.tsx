import { cn } from '../../lib/utils';
import { Card } from '../../components/ui/Card';
import { Search, ExternalLink, Shield, Target, Zap } from 'lucide-react';
import { Input } from '../../components/ui/Input';

const competitors = [
  { 
    name: 'TechFlow AI', 
    pricing: '$49/mo', 
    pos: 'Market Leader', 
    swot: { s: 'Scale', w: 'Cost', o: 'Enterprise', t: 'New Startups' },
    features: ['Real-time analysis', 'Multi-user', 'API Access']
  },
  { 
    name: 'GrowthEngine', 
    pricing: 'Free / Tiered', 
    pos: 'SMB Focused', 
    swot: { s: 'Ease of Use', w: 'Limited Depth', o: 'Direct Sales', t: 'Retention' },
    features: ['Simple UI', 'Basic Reports', 'Community']
  },
  { 
    name: 'ScaleX Proto', 
    pricing: '$2,400/yr', 
    pos: 'Niche Specialist', 
    swot: { s: 'Deep Data', w: 'UX', o: 'Data Sales', t: 'Data Privacy' },
    features: ['Advanced Metrics', 'White-label', 'Proprietary Data']
  }
];

export default function CompetitorAnalysis() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Market Rival Intelligence</h1>
          <p className="text-slate-400">AI-powered comparison and market gap identification.</p>
        </div>
        <div className="w-full md:w-80">
          <Input placeholder="Search competitor domain..." className="bg-white/5" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {competitors.map((comp) => (
          <Card key={comp.name} className="flex flex-col border-white/5 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                <p className="text-xs text-brand-secondary font-semibold uppercase tracking-widest mt-1">{comp.pos}</p>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Starting Price</span>
                <span className="text-white font-medium">{comp.pricing}</span>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Key Features</span>
                <div className="flex flex-wrap gap-2">
                  {comp.features.map(f => (
                    <span key={f} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-slate-300">{f}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mt-auto">
              <div className="grid grid-cols-2 gap-4">
                <SWOTItem label="Strength" val={comp.swot.s} color="text-emerald-400" />
                <SWOTItem label="Weakness" val={comp.swot.w} color="text-red-400" />
                <SWOTItem label="Opportunity" val={comp.swot.o} color="text-blue-400" />
                <SWOTItem label="Threat" val={comp.swot.t} color="text-orange-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/5">Metric</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/5">Our Position</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/5">Market Average</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/5">Variance</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <ComparisonRow label="User Retention" mine="18%" avg="12%" var="+50%" color="emerald" />
            <ComparisonRow label="CAC (Estimated)" mine="$4.20" avg="$5.80" var="-27%" color="emerald" />
            <ComparisonRow label="DAU / MAU Ratio" mine="0.45" avg="0.32" var="+40%" color="emerald" />
            <ComparisonRow label="Avg Response Time" mine="0.8s" avg="1.4s" var="-43%" color="emerald" />
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function SWOTItem({ label, val, color }: any) {
  return (
    <div>
      <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold block mb-1">{label}</span>
      <span className={cn('text-xs font-bold', color)}>{val}</span>
    </div>
  );
}

function ComparisonRow({ label, mine, avg, var: vari, color }: any) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/2 backdrop-blur-sm">
      <td className="px-6 py-4 font-medium text-white">{label}</td>
      <td className="px-6 py-4 text-slate-300 font-mono tracking-tighter">{mine}</td>
      <td className="px-6 py-4 text-slate-500 font-mono tracking-tighter">{avg}</td>
      <td className="px-6 py-4">
        <span className={cn(
          'text-[10px] font-bold px-2 py-0.5 rounded-full',
          color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        )}>
          {vari}
        </span>
      </td>
    </tr>
  );
}
