import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, MapPin, Coffee, Wifi, Laptop, Search as SearchIcon } from 'lucide-react';

const workspaces = [
  {
    name: 'Neural Hub San Francisco',
    price: '$650 / mo',
    location: 'SOMA District, SF',
    facilities: ['Fast Fiber', 'AI Labs', 'Private Pods'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60'
  },
  {
    name: 'The Foundry Berlin',
    price: '€420 / mo',
    location: 'Berlin Mitte, DE',
    facilities: ['24/7 Access', 'Event Hall', 'Coffee Bar'],
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=60'
  },
  {
    name: 'Skyline Workspace NYC',
    price: '$800 / mo',
    location: 'Manhattan, NY',
    facilities: ['VC Suites', 'Podcast Studio', 'Gym'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60'
  },
  {
    name: 'Tech Garden Singapore',
    price: '$550 / mo',
    location: 'Marina Bay, SG',
    facilities: ['Rooftop Pool', 'Cloud Credits', 'Mentors'],
    image: 'https://images.unsplash.com/photo-1497215842964-2229256153f1?w=800&auto=format&fit=crop&q=60'
  }
];

export default function WorkspaceFinder() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Workspace Discovery</h1>
          <p className="text-slate-400">Curated high-performance environments for scaling teams.</p>
        </div>
      </div>

      <Card className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by city or country..."
            className="w-full pl-11 pr-4 py-2 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none">
            <option>All Budgets</option>
            <option>$0 - $500</option>
            <option>$500 - $1000</option>
            <option>$1000+</option>
          </select>
          <Button className="gap-2">
            <Laptop className="w-4 h-4" />
            Explore
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {workspaces.map((space) => (
          <Card key={space.name} className="p-0 overflow-hidden flex flex-col group">
            <div className="h-48 relative overflow-hidden">
              <img 
                src={space.image} 
                alt={space.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-bg-dark/80 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1 font-bold text-brand-secondary text-sm">
                {space.price}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-1">{space.name}</h3>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
                <MapPin className="w-3 h-3 text-brand-primary" />
                {space.location}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {space.facilities.map(f => (
                  <div key={f} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-brand-secondary" />
                    {f}
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-auto" size="sm">Book Visit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
