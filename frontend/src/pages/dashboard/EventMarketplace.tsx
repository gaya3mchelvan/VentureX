import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, MapPin, Users, Filter, Search, Award } from 'lucide-react';
import { Input } from '../../components/ui/Input';

const events = [
  {
    title: 'Silicon Valley Demo Day 2026',
    location: 'San Francisco, CA',
    date: 'June 14, 2026',
    attendees: '400+ Investors',
    type: 'Funding Competition',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'
  },
  {
    title: 'AI Infra Private Meetup',
    location: 'London, UK',
    date: 'June 22, 2026',
    attendees: '20 VC Partners',
    type: 'Exclusive Mixer',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60'
  },
  {
    title: 'Web3 Growth Summit',
    location: 'Tokyo, Japan',
    date: 'July 05, 2026',
    attendees: '1200+ Founders',
    type: 'Conference',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60'
  },
  {
    title: 'Sustainable Tech Pitch',
    location: 'Berlin, DE',
    date: 'July 18, 2026',
    attendees: '50 Angels',
    type: 'Pitch Competition',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60'
  },
];

export default function EventMarketplace() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Investor Marketplace</h1>
          <p className="text-slate-400">Exclusive networking opportunities and funding events globally.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="primary" className="gap-2">
            <Award className="w-4 h-4" />
            Post Event
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatSmall label="Active Meetups" value="842" />
        <StatSmall label="VC Partners" value="1,240" />
        <StatSmall label="Total Funding Pool" value="$4.8B" />
        <StatSmall label="Pitch Slots Open" value="12" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
        {events.map((event) => (
          <Card key={event.title} className="p-0 overflow-hidden flex flex-col sm:flex-row h-full group">
            <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/80 to-transparent sm:hidden" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-brand-primary px-3 py-1 rounded text-white shadow-lg">
                  {event.type}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{event.title}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-400">
                  <Calendar className="w-4 h-4 text-brand-secondary" />
                  <span className="text-sm font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 text-brand-secondary" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Users className="w-4 h-4 text-brand-secondary" />
                  <span className="text-sm font-medium">{event.attendees}</span>
                </div>
              </div>
              <Button className="w-full mt-auto" variant="outline">Apply for Access</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatSmall({ label, value }: any) {
  return (
    <Card className="py-4 px-6 bg-white/2 border-white/5">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </Card>
  );
}
