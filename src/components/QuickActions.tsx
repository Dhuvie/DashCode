import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Code, Video, FileText } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      label: 'Problem Sets',
      description: 'Algorithmic challenges and exercises',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-500',
      links: [
        { name: 'LeetCode Problem Set', url: 'https://leetcode.com/problemset/' },
        { name: 'Codeforces Archive', url: 'https://codeforces.com/problemset' },
      ],
    },
    {
      label: 'Algorithm Theory',
      description: 'Data structures and algorithms',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
      links: [
        { name: 'CP Algorithms', url: 'https://cp-algorithms.com/' },
        { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/' },
      ],
    },
    {
      label: 'Educational Content',
      description: 'Video lectures and tutorials',
      icon: Video,
      gradient: 'from-red-500 to-orange-500',
      links: [
        { name: 'Video Resources', url: 'https://www.youtube.com/results?search_query=competitive+programming' },
      ],
    },
    {
      label: 'Contest Schedule',
      description: 'Upcoming programming competitions',
      icon: FileText,
      gradient: 'from-green-500 to-emerald-500',
      links: [
        { name: 'Contest Calendar', url: 'https://clist.by/' },
      ],
    },
  ];

  return (
    <div className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-8 tracking-tight"
      >
        Learning Resources
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 overflow-hidden">
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${action.gradient} mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-1">{action.label}</h3>
                <p className="text-sm text-gray-400 mb-4">{action.description}</p>

                {/* Links */}
                <div className="space-y-2">
                  {action.links.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
