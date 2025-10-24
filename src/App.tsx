import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Code2, RefreshCw, Clock, Zap, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardProvider, useDashboard } from './contexts/DashboardContext';
import ErrorBoundary from './components/ErrorBoundary';
import AuthModal from './components/AuthModal';
import AnimatedStatCard from './components/AnimatedStatCard';
import AnimatedProgressChart from './components/AnimatedProgressChart';
import AnimatedDifficultyBreakdown from './components/AnimatedDifficultyBreakdown';
import ConfigModal from './components/ConfigModal';
import LoadingAnimation from './components/LoadingAnimation';
import ParticleBackground from './components/ParticleBackground';
import AdvancedStats from './components/AdvancedStats';
import AchievementSystem from './components/AchievementSystem';
import AdvancedCharts from './components/AdvancedCharts';
import ComparisonView from './components/ComparisonView';
import ExportData from './components/ExportData';
import QuickActions from './components/QuickActions';
import SettingsPanel from './components/SettingsPanel';
import NotificationToast, { ToastType } from './components/NotificationToast';

const DashboardContent: React.FC = () => {
  const { user, logout } = useAuth();
  const { config, stats, loading, error, lastUpdated, autoRefresh, loadStats, setConfig, setAutoRefresh, clearError } = useDashboard();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({ 
    message: '', 
    type: 'info', 
    visible: false 
  });

  const handleSaveConfig = (newConfig: any) => {
    setConfig(newConfig);
    setToast({ message: 'Configuration saved successfully!', type: 'success', visible: true });
  };

  const handleRefresh = async () => {
    await loadStats();
    setToast({ message: 'Stats refreshed successfully!', type: 'success', visible: true });
  };

  const chartData = [
    { platform: 'LeetCode', solved: stats.leetcode?.totalSolved || 0 },
    { platform: 'CodeChef', solved: stats.codechef?.problemsSolved || 0 },
    { platform: 'HackerRank', solved: stats.hackerrank?.problemsSolved || 0 },
    { platform: 'Codeforces', solved: stats.codeforces?.problemsSolved || 0 },
  ];

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Loading Animation */}
      <AnimatePresence>
        {loading && <LoadingAnimation />}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-4 rounded-2xl shadow-2xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Code2 className="w-10 h-10 text-white" strokeWidth={2.5} />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  Dashcode
                </h1>
                <p className="text-sm text-gray-300 mt-2 font-normal">
                  Comprehensive Performance Metrics and Statistical Analysis
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="flex gap-3 items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {user && (
                <div className="text-sm text-gray-300 mr-2">
                  Welcome, <span className="font-bold text-white">{user.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Updated {formatLastUpdated()}</span>
                {autoRefresh && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1 text-green-400"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Auto-refresh ON</span>
                  </motion.div>
                )}
              </div>
              <motion.button
                onClick={handleRefresh}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-lg transition-all"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>
              <motion.button
                onClick={() => setIsConfigOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold shadow-lg transition-all"
              >
                Configure
              </motion.button>
              <motion.button
                onClick={() => setIsSettingsOpen(true)}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all"
              >
                <SettingsIcon className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-xl transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-red-400" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Advanced Stats */}
        <AdvancedStats stats={stats} lastUpdated={lastUpdated} />

        {/* Export & Quick Actions */}
        <ExportData stats={stats} />
        <QuickActions />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AnimatedProgressChart data={chartData} />
          {stats.leetcode && (
            <AnimatedDifficultyBreakdown
              easy={stats.leetcode.easySolved}
              medium={stats.leetcode.mediumSolved}
              hard={stats.leetcode.hardSolved}
            />
          )}
        </div>

        {/* Advanced Charts */}
        <AdvancedCharts stats={stats} />

        {/* Achievements */}
        <AchievementSystem stats={stats} />

        {/* Global Comparison */}
        <ComparisonView stats={stats} />
      </main>

      {/* Modals */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSave={handleSaveConfig}
        currentConfig={config} 
      />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={setAutoRefresh}
      />

      {/* Toast Notifications */}
      <NotificationToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />

      {/* Error Toast */}
      {error && (
        <NotificationToast
          message={error}
          type="error"
          isVisible={!!error}
          onClose={clearError}
        />
      )}
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  React.useEffect(() => {
    setShowAuthModal(!isAuthenticated);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Code2 className="w-24 h-24 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-white mb-4">
              Dashcode
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Track your progress across all platforms
            </p>
            <motion.button
              onClick={() => setShowAuthModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => {}} />
      </div>
    );
  }

  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
