import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  BrainCircuit, 
  LineChart, 
  Target, 
  Users, 
  Globe, 
  ArrowRight,
  ChevronRight,
  Sparkles,
  Rocket
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-bg-dark overflow-hidden">
      <Navbar />

      {/* Hero Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[60%] bg-brand-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[60%] bg-brand-secondary/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <main className="relative z-10 pt-32 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-brand-secondary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Next Gen Startup Intelligence
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 max-w-4xl leading-[0.9]"
          >
            AI Operating System <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              for Startups
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 mb-12 max-w-2xl"
          >
            Analyze, grow, and scale startups using AI-driven intelligence. From pitch perfection to burn-rate predictions, VentureX is your ultimate growth partner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/register">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                Launch Dashboard
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto py-32 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={BrainCircuit} 
            title="AI Business Analysis" 
            description="Deep dive into your business model with our advanced neural engines."
          />
          <FeatureCard 
            icon={Target} 
            title="Competitor Intelligence" 
            description="Real-time tracking and analysis of your market rivals and positioning."
          />
          <FeatureCard 
            icon={LineChart} 
            title="Financial Prediction" 
            description="Predict burn-rate and survival runway with machine learning accuracy."
          />
          <FeatureCard 
            icon={Users} 
            title="Investor Network" 
            description="Connect with VCs and Angels that match your industry and stage."
          />
          <FeatureCard 
            icon={Globe} 
            title="Global Marketplace" 
            description="Discovery workspace, tools and exclusive startup events globally."
          />
          <FeatureCard 
            icon={Zap} 
            title="Instant Pitch Deck" 
            description="Generate data-backed pitch content that grabs attention instantly."
          />
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto py-32">
          <Card className="p-12 relative overflow-hidden bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border-white/20">
            <div className="absolute top-0 right-0 p-8">
              <Sparkles className="w-24 h-24 text-white/10" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to scale your vision?</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl">
                Join thousands of founders using VentureX to supercharge their startup journey. No credit card required.
              </p>
              <Link to="/register">
                <Button size="lg" variant="primary">Join the Revolution</Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-brand-primary p-1 rounded">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tighter text-white">VentureX</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link to="#" className="hover:text-white">Privacy</Link>
            <Link to="#" className="hover:text-white">Terms</Link>
            <Link to="#" className="hover:text-white">Contact</Link>
            <Link to="#" className="hover:text-white">API</Link>
          </div>
          <div className="text-sm text-slate-600">
            © 2026 VentureX AI. Built for the future.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="group">
      <div className="bg-brand-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-brand-primary" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
        {title}
        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
