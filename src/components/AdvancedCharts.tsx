import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { PlatformStats } from '../types';

interface AdvancedChartsProps {
  stats: PlatformStats;
}

const AdvancedCharts: React.FC<AdvancedChartsProps> = ({ stats }) => {
  // Platform difficulty comparison - real data only
  const platformComparison = [
    { 
      platform: 'LeetCode', 
      easy: stats.leetcode?.easySolved || 0,
      medium: stats.leetcode?.mediumSolved || 0,
      hard: stats.leetcode?.hardSolved || 0,
    },
    { 
      platform: 'Others', 
      easy: (stats.codechef?.problemsSolved || 0) * 0.4,
      medium: (stats.codechef?.problemsSolved || 0) * 0.4,
      hard: (stats.codechef?.problemsSolved || 0) * 0.2,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-gray-900/90 border border-white/20 rounded-2xl p-4 shadow-2xl"
        >
          {payload.map((entry: any, index: number) => (
            <div key={index} className="text-white text-sm">
              <span className="font-bold">{entry.name}: </span>
              <span style={{ color: entry.color }}>{entry.value}</span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  // Only show if we have LeetCode data
  if (!stats.leetcode || (stats.leetcode.easySolved === 0 && stats.leetcode.mediumSolved === 0 && stats.leetcode.hardSolved === 0)) {
    return null;
  }

  return (
    <div className="mb-12">
      {/* Difficulty Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden lg:col-span-2"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-600/20 blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-white mb-6 tracking-tight">Difficulty Distribution by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={platformComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="platform" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="easy" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} />
              <Line type="monotone" dataKey="medium" stroke="#F59E0B" strokeWidth={3} dot={{ r: 6 }} />
              <Line type="monotone" dataKey="hard" stroke="#EF4444" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedCharts;
