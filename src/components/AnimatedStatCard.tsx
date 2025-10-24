import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { LucideIcon } from 'lucide-react';

interface AnimatedStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  gradient: string;
  delay?: number;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  subtitle, 
  gradient,
  delay = 0 
}) => {
  const valueRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valueRef.current && typeof value === 'number') {
      anime({
        targets: valueRef.current,
        innerHTML: [0, value],
        easing: 'easeOutExpo',
        duration: 2000,
        delay: delay,
        round: 1,
      });
    }

    // Floating animation
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [-10, 10],
        duration: 3000,
        delay: delay,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  }, [value, delay]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative group"
    >
      {/* Glassmorphism card */}
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden">
        {/* Animated gradient background */}
        <div className={`absolute inset-0 ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300 mb-2 tracking-wide uppercase">{title}</p>
            <p ref={valueRef} className="text-4xl font-black text-white mb-1 tracking-tight">
              {typeof value === 'number' ? 0 : value}
            </p>
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay / 1000 + 0.3 }}
                className="text-xs text-gray-400 mt-1"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          
          <motion.div 
            className={`${gradient} p-4 rounded-2xl shadow-lg`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Particle effect on hover */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0, x: '50%', y: '50%' }}
              whileHover={{
                opacity: [0, 1, 0],
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
              }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedStatCard;
