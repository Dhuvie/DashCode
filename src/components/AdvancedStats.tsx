import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { TrendingUp, Calendar, Zap, Target } from 'lucide-react';
import type { PlatformStats } from '../types';

interface AdvancedStatsProps {
  stats: PlatformStats;
  lastUpdated: Date | null;
}

const AdvancedStats: React.FC<AdvancedStatsProps> = ({ stats, lastUpdated }) => {
  const totalProblems = 
    (stats.leetcode?.totalSolved || 0) +
    (stats.codechef?.problemsSolved || 0) +
    (stats.hackerrank?.problemsSolved || 0) +
    (stats.codeforces?.problemsSolved || 0);

  const avgRating = Math.round(
    ((stats.codechef?.rating || 0) + (stats.codeforces?.rating || 0)) / 2
  );

  const totalContests =
    (stats.codechef?.contestsParticipated || 0) +
    (stats.codeforces?.contestsParticipated || 0);

  const metrics = [
    {
      label: 'Problems Solved',
      value: totalProblems,
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Average Rating',
      value: avgRating,
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Contest Participation',
      value: totalContests,
      icon: Calendar,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Active Platforms',
      value: [stats.leetcode, stats.codechef, stats.hackerrank, stats.codeforces].filter(Boolean).length,
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {metrics.map((metric, index) => (
        <MetricCard key={metric.label} metric={metric} delay={index * 100} />
      ))}
    </div>
  );
};

interface MetricCardProps {
  metric: {
    label: string;
    value: number;
    icon: any;
    gradient: string;
  };
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, delay }) => {
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valueRef.current) {
      anime({
        targets: valueRef.current,
        innerHTML: [0, metric.value],
        easing: 'easeOutExpo',
        duration: 2000,
        delay: delay,
        round: 1,
      });
    }
  }, [metric.value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 overflow-hidden">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.gradient} mb-4`}>
          <metric.icon className="w-6 h-6 text-white" />
        </div>

        {/* Value */}
        <div ref={valueRef} className="text-4xl font-black text-white mb-2">
          0
        </div>

        {/* Label */}
        <p className="text-sm text-gray-400 font-medium">{metric.label}</p>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedStats;
