import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Log in to your startup intelligence suite</p>
        </div>

        <Card className="p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="Email Address" placeholder="alex@startup.io" type="email" />
            <Input label="Password" placeholder="••••••••" type="password" />
            
            <div className="flex items-center justify-between text-xs py-2">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-white/5 text-brand-primary focus:ring-offset-0 focus:ring-brand-primary" />
                Remember me
              </label>
              <Link to="#" className="text-brand-primary hover:underline">Forgot password?</Link>
            </div>

            <Link to="/dashboard">
              <Button className="w-full mt-4" size="lg">Log In</Button>
            </Link>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm">
            <span className="text-slate-400">Don't have an account? </span>
            <Link to="/register" className="text-brand-primary font-medium hover:underline">Sign Up</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
