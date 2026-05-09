import { cn } from '../../lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Card } from '../../components/ui/Card';
import { BrainCircuit, TrendingUp, AlertCircle, ShieldCheck, Zap, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

const scoreData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 68 },
  { name: 'Mar', score: 75 },
  { name: 'Apr', score: 72 },
  { name: 'May', score: 84 },
  { name: 'Jun', score: 92 },
];

const segmentData = [
  { name: 'Product', value: 35, color: '#8b5cf6' },
  { name: 'Market', value: 25, color: '#06b6d4' },
  { name: 'Team', value: 20, color: '#10b981' },
  { name: 'Financials', value: 20, color: '#f59e0b' },
];

export default function AIAnalysis() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Startup Intelligence</h1>
          <p className="text-slate-400">Comprehensive AI engine results for your venture intelligence.</p>
        </div>
        <Card className="flex items-center gap-4 py-3 px-6 bg-brand-primary/10 border-brand-primary/20">
          <div className="text-right text-xs font-semibold text-slate-400 uppercase tracking-widest">Global Rank</div>
          <div className="text-3xl font-black text-brand-primary italic">#042</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <StatCard 
          label="Startup Score" 
          value="92" 
          sub="Out of 100" 
          trend="+12% this month"
          icon={BrainCircuit}
          color="primary"
        />
        <StatCard 
          label="Market Potential" 
          value="$4.2B" 
          sub="TAM/SAM Model" 
          trend="High"
          icon={TrendingUp}
          color="secondary"
        />
        <StatCard 
          label="Investor Readiness" 
          value="Grade A" 
          sub="VC Compatibility" 
          trend="Excellent"
          icon={ShieldCheck}
          color="emerald"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Venture Score Growth</h3>
          <div className="flex-1 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Score Composition</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {segmentData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InsightBlock 
          title="AI Strengths" 
          items={[
            "Scalable microservices architecture identified.",
            "Strong addressable market in Southeast Asia.",
            "Founding team shows 98th percentile technical capacity."
          ]}
          icon={Zap}
        />
        <InsightBlock 
          title="Critical Risks" 
          items={[
            "Competitor XYZ recently secured Series B funding.",
            "Potential regulatory hurdles in EU markets.",
            "Current burn-rate exceeds optimized AI projection."
          ]}
          icon={AlertCircle}
          type="risk"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, trend, icon: Icon, color }: any) {
  const colors: any = {
    primary: 'text-brand-primary bg-brand-primary/10',
    secondary: 'text-brand-secondary bg-brand-secondary/10',
    emerald: 'text-emerald-400 bg-emerald-400/10'
  };

  return (
    <Card className="flex items-center gap-6">
      <div className={cn('p-4 rounded-2xl', colors[color])}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-xs text-slate-500 font-medium">{sub}</span>
        </div>
        <p className="text-xs font-medium text-brand-secondary mt-1">{trend}</p>
      </div>
    </Card>
  );
}

function InsightBlock({ title, items, icon: Icon, type = 'strength' }: any) {
  return (
    <Card className={cn(
      'border-l-4',
      type === 'strength' ? 'border-l-brand-primary' : 'border-l-orange-500'
    )}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={cn('w-5 h-5', type === 'strength' ? 'text-brand-primary' : 'text-orange-500')} />
        <h4 className="font-bold text-white uppercase text-sm tracking-wider">{title}</h4>
      </div>
      <ul className="space-y-3">
        {items.map((item: string, i: number) => (
          <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
            <span className="text-slate-600 font-mono">{i + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
