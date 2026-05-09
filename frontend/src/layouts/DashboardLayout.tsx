import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion } from 'motion/react';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-bg-dark flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative overflow-hidden">
        {/* Background blobs for dashboard */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
