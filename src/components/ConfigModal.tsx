import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import type { UserConfig } from '../types';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: UserConfig) => void;
  currentConfig: UserConfig;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose, onSave, currentConfig }) => {
  const [config, setConfig] = useState<UserConfig>(currentConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/20 rounded-3xl shadow-2xl max-w-md w-full p-8"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-white tracking-tight">Configure Usernames</h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-300" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                    LeetCode Username
                  </label>
                  <input
                    type="text"
                    value={config.leetcode || ''}
                    onChange={(e) => setConfig({ ...config, leetcode: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                    CodeChef Username
                  </label>
                  <input
                    type="text"
                    value={config.codechef || ''}
                    onChange={(e) => setConfig({ ...config, codechef: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                    HackerRank Username
                  </label>
                  <input
                    type="text"
                    value={config.hackerrank || ''}
                    onChange={(e) => setConfig({ ...config, hackerrank: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide">
                    Codeforces Username
                  </label>
                  <input
                    type="text"
                    value={config.codeforces || ''}
                    onChange={(e) => setConfig({ ...config, codeforces: e.target.value })}
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-6"
                >
                  <Save className="w-5 h-5" />
                  Save Configuration
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfigModal;
