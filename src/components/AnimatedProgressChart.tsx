import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnimatedProgressChartProps {
  data: Array<{
    platform: string;
    solved: number;
  }>;
}

const AnimatedProgressChart: React.FC<AnimatedProgressChartProps> = ({ data }) => {
  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-gray-900/90 border border-white/20 rounded-2xl p-4 shadow-2xl"
        >
          <p className="text-white font-bold text-lg">{payload[0].payload.platform}</p>
          <p className="text-blue-400 text-sm mt-1">
            Problems Solved: <span className="font-bold">{payload[0].value}</span>
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
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-900/40 dark:to-gray-900/20 rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>
      
      <div className="relative z-10">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-black text-white mb-6 tracking-tight"
        >
          Problems Solved by Platform
        </motion.h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <defs>
              {colors.map((color, index) => (
                <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="platform" 
              stroke="rgba(255,255,255,0.6)" 
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)" 
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
            <Bar dataKey="solved" radius={[12, 12, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AnimatedProgressChart;
