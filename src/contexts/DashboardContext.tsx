import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserConfig, PlatformStats } from '../types';
import { fetchLeetCodeStats, fetchCodeChefStats, fetchHackerRankStats, fetchCodeforcesStats } from '../services/api';

interface DashboardContextType {
  config: UserConfig;
  stats: PlatformStats;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  autoRefresh: boolean;
  setConfig: (config: UserConfig) => void;
  loadStats: () => Promise<void>;
  setAutoRefresh: (enabled: boolean) => void;
  clearError: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<UserConfig>(() => {
    const saved = localStorage.getItem('userConfig');
    return saved ? JSON.parse(saved) : {
      leetcode: '',
      codechef: '',
      hackerrank: '',
      codeforces: '',
    };
  });

  const [stats, setStats] = useState<PlatformStats>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const loadStats = useCallback(async () => {
    // Don't load if no usernames are configured
    if (!config.leetcode && !config.codechef && !config.hackerrank && !config.codeforces) {
      return;
    }

    setLoading(true);
    setError(null);
    const newStats: PlatformStats = {};
    const errors: string[] = [];

    try {
      const promises = [];

      if (config.leetcode && config.leetcode.trim()) {
        promises.push(
          fetchLeetCodeStats(config.leetcode)
            .then(data => { newStats.leetcode = data; })
            .catch(err => errors.push(`LeetCode: ${err.message}`))
        );
      }

      if (config.codechef && config.codechef.trim()) {
        promises.push(
          fetchCodeChefStats(config.codechef)
            .then(data => { newStats.codechef = data; })
            .catch(err => errors.push(`CodeChef: ${err.message}`))
        );
      }

      if (config.hackerrank && config.hackerrank.trim()) {
        promises.push(
          fetchHackerRankStats(config.hackerrank)
            .then(data => { newStats.hackerrank = data; })
            .catch(err => errors.push(`HackerRank: ${err.message}`))
        );
      }

      if (config.codeforces && config.codeforces.trim()) {
        promises.push(
          fetchCodeforcesStats(config.codeforces)
            .then(data => { newStats.codeforces = data; })
            .catch(err => errors.push(`Codeforces: ${err.message}`))
        );
      }

      await Promise.allSettled(promises);

      setStats(newStats);
      setLastUpdated(new Date());

      if (errors.length > 0) {
        setError(errors.join(', '));
      }
    } catch (err) {
      setError('Failed to load stats. Please try again.');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }, [config]);

  const setConfig = useCallback((newConfig: UserConfig) => {
    setConfigState(newConfig);
    localStorage.setItem('userConfig', JSON.stringify(newConfig));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadStats();
      }, 5 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, loadStats]);

  // Initial load
  useEffect(() => {
    if (config.leetcode || config.codechef || config.hackerrank || config.codeforces) {
      loadStats();
    }
  }, [config, loadStats]);

  return (
    <DashboardContext.Provider
      value={{
        config,
        stats,
        loading,
        error,
        lastUpdated,
        autoRefresh,
        setConfig,
        loadStats,
        setAutoRefresh,
        clearError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
