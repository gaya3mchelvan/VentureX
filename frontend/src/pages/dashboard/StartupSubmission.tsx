import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Rocket, Sparkles, Loader2 } from 'lucide-react';

export default function StartupSubmission() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      window.location.href = '/dashboard/analysis';
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Launch Analysis</h1>
        <p className="text-slate-400">Provide your startup details. Our neural engines will analyze market fit and potential metrics.</p>
      </div>

      <Card className="relative overflow-hidden">
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 glass-dark flex flex-col items-center justify-center gap-6"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-brand-primary animate-spin" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-brand-secondary animate-pulse" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Analyzing Startup...</h3>
                <p className="text-slate-400 animate-pulse italic">Scanning global market trends and neural data patterns</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Startup Name" placeholder="e.g. NeuralLink Pro" required />
            <Input label="Category" placeholder="e.g. AI / Fintech / Saas" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Business Summary</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all min-h-[120px]" 
              placeholder="What problem are you solving?"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Funding Requirement" placeholder="e.g. $500,000" type="text" />
            <Input label="Target Audience" placeholder="e.g. Enterprise HR Teams" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Business Model" placeholder="e.g. B2B Subscription" />
            <Input label="Pitch Link / File" placeholder="URL to your pitch deck" />
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-slate-500 max-w-sm">
              Our AI analysis takes approximately 10-15 seconds to process global baseline comparisons.
            </p>
            <Button size="lg" className="gap-2" disabled={isAnalyzing}>
              <Rocket className="w-5 h-5" />
              Submit for Analysis
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
