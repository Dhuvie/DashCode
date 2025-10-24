import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Zap, Target, Flame, Crown, Medal } from 'lucide-react';
import type { PlatformStats } from '../types';

interface AchievementSystemProps {
  stats: PlatformStats;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ stats }) => {
  const totalProblems = 
    (stats.leetcode?.totalSolved || 0) +
    (stats.codechef?.problemsSolved || 0) +
    (stats.hackerrank?.problemsSolved || 0) +
    (stats.codeforces?.problemsSolved || 0);

  const achievements = [
    {
      id: 1,
      title: 'Initial Milestone',
      description: 'Complete first algorithmic challenge',
      icon: Star,
      unlocked: totalProblems >= 1,
      progress: Math.min(totalProblems, 1),
      max: 1,
      rarity: 'common',
    },
    {
      id: 2,
      title: 'Centennial Achievement',
      description: 'Solve 100 algorithmic problems',
      icon: Trophy,
      unlocked: totalProblems >= 100,
      progress: Math.min(totalProblems, 100),
      max: 100,
      rarity: 'rare',
    },
    {
      id: 3,
      title: 'Advanced Proficiency',
      description: 'Solve 500 algorithmic problems',
      icon: Award,
      unlocked: totalProblems >= 500,
      progress: Math.min(totalProblems, 500),
      max: 500,
      rarity: 'epic',
    },
    {
      id: 4,
      title: 'Expert Level',
      description: 'Solve 1000 algorithmic problems',
      icon: Crown,
      unlocked: totalProblems >= 1000,
      progress: Math.min(totalProblems, 1000),
      max: 1000,
      rarity: 'legendary',
    },
    {
      id: 5,
      title: 'Cross-Platform Engagement',
      description: 'Maintain active presence across all platforms',
      icon: Zap,
      unlocked: !!(stats.leetcode && stats.codechef && stats.hackerrank && stats.codeforces),
      progress: [stats.leetcode, stats.codechef, stats.hackerrank, stats.codeforces].filter(Boolean).length,
      max: 4,
      rarity: 'rare',
    },
    {
      id: 6,
      title: 'Advanced Complexity',
      description: 'Solve 50 high-difficulty problems',
      icon: Flame,
      unlocked: (stats.leetcode?.hardSolved || 0) >= 50,
      progress: Math.min(stats.leetcode?.hardSolved || 0, 50),
      max: 50,
      rarity: 'epic',
    },
    {
      id: 7,
      title: 'Competitive Engagement',
      description: 'Participate in 20 programming contests',
      icon: Medal,
      unlocked: ((stats.codechef?.contestsParticipated || 0) + (stats.codeforces?.contestsParticipated || 0)) >= 20,
      progress: Math.min((stats.codechef?.contestsParticipated || 0) + (stats.codeforces?.contestsParticipated || 0), 20),
      max: 20,
      rarity: 'rare',
    },
    {
      id: 8,
      title: 'Distinguished Performance',
      description: 'Achieve rating threshold of 2000+',
      icon: Target,
      unlocked: (stats.codechef?.rating || 0) >= 2000 || (stats.codeforces?.rating || 0) >= 2000,
      progress: Math.min(Math.max(stats.codechef?.rating || 0, stats.codeforces?.rating || 0), 2000),
      max: 2000,
      rarity: 'legendary',
    },
  ];

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-cyan-500',
    epic: 'from-purple-500 to-pink-500',
    legendary: 'from-yellow-500 to-orange-500',
  };

  return (
    <div className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-3"
      >
        <Trophy className="w-7 h-7 text-yellow-400" />
        Performance Milestones
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className={`relative backdrop-blur-xl rounded-2xl p-6 border overflow-hidden ${
              achievement.unlocked 
                ? 'bg-white/10 border-white/20' 
                : 'bg-white/5 border-white/10 opacity-60'
            }`}>
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[achievement.rarity]} ${
                achievement.unlocked ? 'opacity-20' : 'opacity-5'
              } group-hover:opacity-30 transition-opacity duration-500`}></div>

              {/* Icon */}
              <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${rarityColors[achievement.rarity]} mb-4 ${
                !achievement.unlocked && 'grayscale'
              }`}>
                <achievement.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>

                {/* Progress bar */}
                <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.max) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className={`h-full bg-gradient-to-r ${rarityColors[achievement.rarity]}`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {achievement.progress} / {achievement.max}
                </p>
              </div>

              {/* Unlocked badge */}
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: index * 0.05 + 0.5 }}
                  className="absolute top-4 right-4 bg-green-500 rounded-full p-2"
                >
                  <Star className="w-4 h-4 text-white fill-white" />
                </motion.div>
              )}

              {/* Shine effect */}
              {achievement.unlocked && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;
