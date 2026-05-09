import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-secondary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-brand-primary p-1.5 rounded-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">VentureX</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join the elite ecosystem for high-growth startups</p>
        </div>

        <Card className="p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="Jane" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input label="Email Address" placeholder="jane@startup.io" type="email" />
            <Input label="Password" placeholder="••••••••" type="password" />
            
            <p className="text-[10px] text-slate-500 text-center px-4 leading-relaxed mt-4">
              By signing up, you agree to our <Link to="#" className="text-brand-primary">Terms of Service</Link> and <Link to="#" className="text-brand-primary">Privacy Policy</Link>.
            </p>

            <Link to="/dashboard">
              <Button className="w-full mt-4" size="lg">Start Building</Button>
            </Link>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm">
            <span className="text-slate-400">Already have an account? </span>
            <Link to="/login" className="text-brand-primary font-medium hover:underline">Log In</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
