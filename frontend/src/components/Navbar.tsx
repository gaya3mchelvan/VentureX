import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Rocket } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-dark">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-brand-primary p-1.5 rounded-lg">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tighter text-white">VentureX</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link to="/" className="hover:text-white transition-colors">Platform</Link>
        <Link to="/" className="hover:text-white transition-colors">Intelligence</Link>
        <Link to="/" className="hover:text-white transition-colors">Marketplace</Link>
        <Link to="/" className="hover:text-white transition-colors">Ecosystem</Link>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button variant="ghost" size="sm">Log In</Button>
        </Link>
        <Link to="/register">
          <Button variant="primary" size="sm">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
