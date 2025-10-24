import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon, Share2, Check } from 'lucide-react';
import type { PlatformStats } from '../types';

interface ExportDataProps {
  stats: PlatformStats;
}

const ExportData: React.FC<ExportDataProps> = ({ stats }) => {
  const [copied, setCopied] = useState(false);

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coding-stats-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = () => {
    const csvData = [
      ['Platform', 'Problems Solved', 'Rating', 'Rank'],
      ['LeetCode', stats.leetcode?.totalSolved || 0, '-', stats.leetcode?.ranking || '-'],
      ['CodeChef', stats.codechef?.problemsSolved || 0, stats.codechef?.rating || '-', stats.codechef?.globalRank || '-'],
      ['HackerRank', stats.hackerrank?.problemsSolved || 0, '-', stats.hackerrank?.rank || '-'],
      ['Codeforces', stats.codeforces?.problemsSolved || 0, stats.codeforces?.rating || '-', '-'],
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coding-stats-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareStats = async () => {
    const totalProblems = 
      (stats.leetcode?.totalSolved || 0) +
      (stats.codechef?.problemsSolved || 0) +
      (stats.hackerrank?.problemsSolved || 0) +
      (stats.codeforces?.problemsSolved || 0);

    const text = `🚀 My Coding Stats:\n\n` +
      `📊 Total Problems: ${totalProblems}\n` +
      `💻 LeetCode: ${stats.leetcode?.totalSolved || 0} problems\n` +
      `⭐ CodeChef: ${stats.codechef?.rating || 0} rating\n` +
      `🏆 Codeforces: ${stats.codeforces?.rating || 0} rating\n\n` +
      `Track your progress too! 🎯`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportOptions = [
    {
      label: 'Export as JSON',
      icon: FileText,
      action: exportAsJSON,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Export as CSV',
      icon: Download,
      action: exportAsCSV,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: copied ? 'Copied!' : 'Share Stats',
      icon: copied ? Check : Share2,
      action: shareStats,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {exportOptions.map((option, index) => (
        <motion.button
          key={option.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={option.action}
          className="relative group"
        >
          <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 overflow-hidden">
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

            <div className="relative flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${option.gradient}`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold">{option.label}</span>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ExportData;
