import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AnimatedDifficultyBreakdownProps {
  easy: number;
  medium: number;
  hard: number;
}

const AnimatedDifficultyBreakdown: React.FC<AnimatedDifficultyBreakdownProps> = ({ easy, medium, hard }) => {
  const data = [
    { name: 'Easy', value: easy, color: '#10B981', gradient: 'from-green-400 to-emerald-600' },
    { name: 'Medium', value: medium, color: '#F59E0B', gradient: 'from-yellow-400 to-orange-600' },
    { name: 'Hard', value: hard, color: '#EF4444', gradient: 'from-red-400 to-rose-600' },
  ];

  const total = easy + medium + hard;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-gray-900/90 border border-white/20 rounded-2xl p-4 shadow-2xl"
        >
          <p className="text-white font-bold text-lg">{payload[0].name}</p>
          <p className="text-gray-300 text-sm mt-1">
            Count: <span className="font-bold">{payload[0].value}</span>
          </p>
          <p className="text-gray-300 text-sm">
            Percentage: <span className="font-bold">{percentage}%</span>
          </p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-900/40 dark:to-gray-900/20 rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-yellow-600/20 to-red-600/20 blur-3xl"></div>
      
      <div className="relative z-10">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-black text-white mb-6 tracking-tight"
        >
          Difficulty Distribution
        </motion.h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <defs>
              {data.map((entry, index) => (
                <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1500}
              animationBegin={200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#pieGradient${index})`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
              whileHover={{ scale: 1.05 }}
              className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <div className={`inline-block bg-gradient-to-r ${item.gradient} rounded-full p-2 mb-2`}>
                <p className="text-2xl font-black text-white">{item.value}</p>
              </div>
              <p className="text-sm text-gray-300 font-medium">{item.name}</p>
              <p className="text-xs text-gray-400 mt-1">
                {((item.value / total) * 100).toFixed(1)}%
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedDifficultyBreakdown;
