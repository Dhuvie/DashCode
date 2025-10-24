import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Zap, Trash2 } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  autoRefresh: boolean;
  onAutoRefreshChange: (enabled: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  autoRefresh,
  onAutoRefreshChange,
}) => {

  const settings = [
    {
      id: 'autoRefresh',
      label: 'Auto Refresh',
      description: 'Automatically refresh stats every 5 minutes',
      icon: Zap,
      value: autoRefresh,
      onChange: onAutoRefreshChange,
    },
  ];

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
            initial={{ scale: 0.9, opacity: 0, x: 300 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.9, opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/20 rounded-3xl shadow-2xl max-w-md w-full p-8"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-3xl"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Settings</h2>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-300" />
                </motion.button>
              </div>

              {/* Settings List */}
              <div className="space-y-4 mb-6">
                {/* Clear Data Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="backdrop-blur-sm bg-red-500/10 rounded-2xl p-4 border border-red-500/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-red-500/20">
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Clear All Data</h3>
                        <p className="text-xs text-gray-400">Remove all saved accounts and configurations</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (window.confirm('Are you sure? This will delete all your data including accounts and configurations.')) {
                          localStorage.clear();
                          window.location.reload();
                        }
                      }}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-bold transition-colors"
                    >
                      Clear
                    </motion.button>
                  </div>
                </motion.div>

                {settings.map((setting, index) => (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-white/10">
                          <setting.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{setting.label}</h3>
                          <p className="text-xs text-gray-400">{setting.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setting.onChange(!setting.value)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          setting.value ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: setting.value ? 24 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                        />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
