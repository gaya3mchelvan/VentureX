/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';
import StartupSubmission from './pages/dashboard/StartupSubmission';
import AIAnalysis from './pages/dashboard/AIAnalysis';
import CompetitorAnalysis from './pages/dashboard/CompetitorAnalysis';
import BurnRate from './pages/dashboard/BurnRate';
import EventMarketplace from './pages/dashboard/EventMarketplace';
import WorkspaceFinder from './pages/dashboard/WorkspaceFinder';
import RevenueAnalytics from './pages/dashboard/RevenueAnalytics';

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard Routes (Protected in a real app, layout-wrapped here) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/analysis" replace />} />
            <Route path="submit" element={<StartupSubmission />} />
            <Route path="analysis" element={<AIAnalysis />} />
            <Route path="competitors" element={<CompetitorAnalysis />} />
            <Route path="burn-rate" element={<BurnRate />} />
            <Route path="events" element={<EventMarketplace />} />
            <Route path="workspaces" element={<WorkspaceFinder />} />
            <Route path="revenue" element={<RevenueAnalytics />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

