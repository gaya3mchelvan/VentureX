import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, LineChart, Line
} from 'recharts';
import { Card } from '../../components/ui/Card';
import { Flame, AlertTriangle, Lightbulb, Clock, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';

const financialData = [
  { month: 'Jan', revenue: 4000, expenses: 12000 },
  { month: 'Feb', revenue: 5500, expenses: 11500 },
  { month: 'Mar', revenue: 8000, expenses: 13000 },
  { month: 'Apr', revenue: 12000, expenses: 15000 },
  { month: 'May', revenue: 14500, expenses: 16000 },
  { month: 'Jun', revenue: 21000, expenses: 18000 },
];

export default function BurnRate() {
  const survivalMonths = 14;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Financial Engine</h1>
        <p className="text-slate-400">Survival runway forecasting and expense optimization.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <MetricCard icon={Flame} label="Monthly Burn" value="$18,000" sub="Stabilizing" trend="down" />
        <MetricCard icon={Clock} label="Survival Runway" value={`${survivalMonths} Months`} sub="Critical Point: Aug 2027" trend="none" />
        <MetricCard icon={DollarSign} label="Monthly Revenue" value="$21,000" sub="MRR Growth: +24%" trend="up" />
        <MetricCard icon={AlertTriangle} label="Next Funding" value="Q4 2026" sub="Recommended Series A" trend="none" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[450px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Revenue vs. Expenses</h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary" />
                <span className="text-slate-400 font-semibold tracking-wider">REVENUE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-slate-400 font-semibold tracking-wider">EXPENSES</span>
              </div>
            </div>
          </div>
          <div className="flex-1 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="rgba(239, 68, 68, 0.4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[450px]">
          <h3 className="text-lg font-bold text-white mb-6">Optimized Strategy</h3>
          <div className="space-y-6">
            <SuggestionItem 
              impact="High" 
              text="Migration to serverless could reduce infrastructure costs by 35% based on load patterns." 
            />
            <SuggestionItem 
              impact="Medium" 
              text="Marketing spend in APAC shows 0.8x ROI. Recommend reallocation to North America." 
            />
            <SuggestionItem 
              impact="Low" 
              text="Annual SaaS subscriptions renewal in 45 days. Consolidate seat usage." 
            />
            
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-yellow-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Efficiency Alert</span>
              </div>
              <p className="text-xs text-yellow-500/70 leading-relaxed italic">
                Current growth trajectory leads to "Default Alive" status in 3.4 months if growth rate maintains {'>'}18%.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub, trend }: any) {
  return (
    <Card className="border-white/5 bg-gradient-to-br from-white/5 to-transparent">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <Icon className="w-5 h-5 text-brand-secondary" />
        </div>
        {trend !== 'none' && (
          <span className={cn(
            'text-[10px] font-bold px-2 py-0.5 rounded-full',
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-100'
          )}>
            {trend === 'up' ? '+14%' : '-8%'}
          </span>
        )}
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-white mb-1">{value}</h4>
      <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
    </Card>
  );
}

function SuggestionItem({ impact, text }: any) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <Lightbulb className="w-4 h-4 text-brand-primary" />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Impact</span>
          <span className={cn(
            'text-[8px] font-bold uppercase tracking-widest',
            impact === 'High' ? 'text-brand-secondary' : 'text-slate-400'
          )}>{impact}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
