import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, Target } from 'lucide-react';
import type { PlatformStats } from '../types';

interface ComparisonViewProps {
  stats: PlatformStats;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ stats }) => {
  // Calculate user stats
  const totalProblems = 
    (stats.leetcode?.totalSolved || 0) +
    (stats.codechef?.problemsSolved || 0) +
    (stats.hackerrank?.problemsSolved || 0) +
    (stats.codeforces?.problemsSolved || 0);
  
  // Don't show if no data
  if (totalProblems === 0) {
    return null;
  }

  // Global averages based on platform statistics
  const globalAverage = {
    leetcode: 150,
    codechef: 1500,
    codeforces: 1400,
    totalProblems: 400,
  };

  const userStats = {
    leetcode: stats.leetcode?.totalSolved || 0,
    codechef: stats.codechef?.rating || 0,
    codeforces: stats.codeforces?.rating || 0,
    totalProblems: 
      (stats.leetcode?.totalSolved || 0) +
      (stats.codechef?.problemsSolved || 0) +
      (stats.hackerrank?.problemsSolved || 0) +
      (stats.codeforces?.problemsSolved || 0),
  };

  const comparisons = [
    {
      label: 'LeetCode Problems',
      user: userStats.leetcode,
      average: globalAverage.leetcode,
      icon: Target,
      gradient: 'from-orange-500 to-red-600',
    },
    {
      label: 'CodeChef Rating',
      user: userStats.codechef,
      average: globalAverage.codechef,
      icon: Award,
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      label: 'Codeforces Rating',
      user: userStats.codeforces,
      average: globalAverage.codeforces,
      icon: TrendingUp,
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      label: 'Total Problems',
      user: userStats.totalProblems,
      average: globalAverage.totalProblems,
      icon: Users,
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  const getPercentage = (user: number, average: number) => {
    if (average === 0) return 0;
    return Math.round((user / average) * 100);
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 150) return { text: 'Outstanding', color: 'text-yellow-400' };
    if (percentage >= 120) return { text: 'Excellent', color: 'text-green-400' };
    if (percentage >= 100) return { text: 'Above Average', color: 'text-blue-400' };
    if (percentage >= 80) return { text: 'Satisfactory', color: 'text-gray-400' };
    return { text: 'Developing', color: 'text-orange-400' };
  };

  return (
    <div className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-3"
      >
        <Users className="w-7 h-7 text-blue-400" />
        Comparative Performance Analysis
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((comparison, index) => {
          const percentage = getPercentage(comparison.user, comparison.average);
          const performance = getPerformanceLevel(percentage);

          return (
            <motion.div
              key={comparison.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${comparison.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${comparison.gradient}`}>
                        <comparison.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{comparison.label}</h3>
                        <p className={`text-sm font-bold ${performance.color}`}>
                          {performance.text}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{percentage}%</div>
                      <div className="text-xs text-gray-400">vs average</div>
                    </div>
                  </div>

                  {/* Comparison bars */}
                  <div className="space-y-3">
                    {/* User bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>You</span>
                        <span className="font-bold text-white">{comparison.user}</span>
                      </div>
                      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((comparison.user / Math.max(comparison.user, comparison.average)) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${comparison.gradient} rounded-full`}
                        />
                      </div>
                    </div>

                    {/* Average bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Global Average</span>
                        <span className="font-bold text-gray-300">{comparison.average}</span>
                      </div>
                      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((comparison.average / Math.max(comparison.user, comparison.average)) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                          className="h-full bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Difference indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      comparison.user >= comparison.average 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {comparison.user >= comparison.average ? '+' : ''}{comparison.user - comparison.average}
                    </div>
                    <span className="text-xs text-gray-400">
                      {comparison.user >= comparison.average ? 'above' : 'below'} average
                    </span>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonView;
