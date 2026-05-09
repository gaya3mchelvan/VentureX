import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Card } from '../../components/ui/Card';
import { TrendingUp, Users, Target, Rocket, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const revenueData = [
  { day: 'Mon', revenue: 1200, users: 45 },
  { day: 'Tue', revenue: 1800, users: 52 },
  { day: 'Wed', revenue: 1600, users: 48 },
  { day: 'Thu', revenue: 2400, users: 61 },
  { day: 'Fri', revenue: 3200, users: 89 },
  { day: 'Sat', revenue: 2800, users: 74 },
  { day: 'Sun', revenue: 3500, users: 92 },
];

export default function RevenueAnalytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Growth Analytics</h1>
          <p className="text-slate-400">Neural tracking of revenue streams and acquisition metrics.</p>
        </div>
        <Card className="hidden sm:flex items-center gap-3 py-2 px-4 bg-white/5 border-white/10">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span className="text-xs font-bold text-white uppercase tracking-widest">AI Strategy Active</span>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SmallMetric label="Total Revenue" value="$42,840" change="+18.4%" icon={TrendingUp} />
        <SmallMetric label="New Customers" value="482" change="+12.1%" icon={Users} />
        <SmallMetric label="Ad Conversion" value="4.2%" change="-1.2%" icon={Target} />
        <SmallMetric label="Acquisition Cost" value="$12.40" change="-8.4%" icon={Rocket} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Trajectory</h3>
          <div className="flex-1 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Daily Active Acquisition</h3>
          <div className="flex-1 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StrategyCard 
          title="Growth Engine Recommendations"
          items={[
            "Incentivize annual billing to increase LTV by projected 22%.",
            "Target users who visited pricing page 3+ times with custom offer.",
            "Double down on content marketing for 'Enterprise AI' keywords."
          ]}
        />
        <StrategyCard 
          title="Churn Risk Analysis"
          items={[
            "3 accounts identified as high-risk based on login inactivity.",
            "Onboarding completion rate is 62%. Focus on Step 3 friction.",
            "Recommend direct reach out to top-tier accounts with low usage."
          ]}
        />
      </div>
    </div>
  );
}

function SmallMetric({ label, value, change, icon: Icon }: any) {
  const isPositive = change.startsWith('+');
  return (
    <Card className="flex flex-col gap-1">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-4 h-4 text-slate-500" />
        <span className={cn(
          'text-[10px] font-bold px-2 py-0.5 rounded-full',
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-100'
        )}>
          {change}
        </span>
      </div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </Card>
  );
}

function StrategyCard({ title, items }: any) {
  return (
    <Card className="bg-gradient-to-br from-brand-primary/10 to-transparent">
      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center justify-between">
        {title}
        <ArrowUpRight className="w-4 h-4 text-brand-primary" />
      </h4>
      <div className="space-y-4">
        {items.map((item: string, i: number) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
            <p className="text-sm text-slate-400 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
