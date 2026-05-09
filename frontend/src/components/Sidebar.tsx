import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  Flame, 
  Calendar, 
  MapPin, 
  BarChart3,
  LogOut,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'AI Analysis', path: '/dashboard/analysis' },
  { icon: PlusCircle, label: 'Submit Startup', path: '/dashboard/submit' },
  { icon: Search, label: 'Competitors', path: '/dashboard/competitors' },
  { icon: Flame, label: 'Burn Rate', path: '/dashboard/burn-rate' },
  { icon: Calendar, label: 'Events', path: '/dashboard/events' },
  { icon: MapPin, label: 'Workspaces', path: '/dashboard/workspaces' },
  { icon: BarChart3, label: 'Revenue', path: '/dashboard/revenue' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 glass-dark border-r border-white/5 flex flex-col z-40">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-primary p-1.5 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">VentureX</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200',
                isActive 
                  ? 'bg-brand-primary/10 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn('w-5 h-5', isActive ? 'text-brand-primary' : 'text-slate-400 group-hover:text-white')} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-brand-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-400 hover:text-red-400 transition-colors uppercase tracking-widest text-[10px] font-bold">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
