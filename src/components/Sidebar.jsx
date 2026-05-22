import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Settings, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';
import { themes, nightTheme } from '../store/themeConfig';

const Sidebar = () => {
  const { xp, level, streak, isNight, setNight, isMuted, toggleMute, totalTreesGrown, gardenTheme } = useStore();

  const currentTheme = isNight ? nightTheme : (themes[gardenTheme] || themes.spring);
  const themeColors = currentTheme.ui;

  const xpToNextLevel = (level * 1000) - (xp % 1000);
  const progressToNextLevel = ((xp % 1000) / 1000) * 100;

  return (
    <div className="h-full flex flex-col gap-6 p-6 w-full max-w-xs">
      {/* Profile Card */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col items-center">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner mb-4"
          style={{ background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.accent})` }}
        >
          <Trophy className="text-white w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold" style={{ color: themeColors.text }}>Focus Master</h2>
        <p className="text-sm font-medium" style={{ color: themeColors.text, opacity: 0.7 }}>Level {level}</p>
        
        {/* XP Bar */}
        <div className="w-full mt-4">
          <div className="flex justify-between text-[10px] uppercase font-bold mb-1" style={{ color: themeColors.text, opacity: 0.7 }}>
            <span>XP: {xp % 1000}</span>
            <span>Next: {xpToNextLevel}</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: themeColors.secondary, opacity: 0.3 }}>
            <motion.div 
              className="h-full"
              style={{ backgroundColor: themeColors.primary }}
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <Flame className="w-6 h-6 mb-1" style={{ color: themeColors.accent }} />
          <span className="text-lg font-bold" style={{ color: themeColors.text }}>{streak}</span>
          <span className="text-[10px] uppercase font-bold" style={{ color: themeColors.text, opacity: 0.5 }}>Day Streak</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: `${themeColors.primary}33` }}>
             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.primary }} />
          </div>
          <span className="text-lg font-bold" style={{ color: themeColors.text }}>{totalTreesGrown}</span>
          <span className="text-[10px] uppercase font-bold" style={{ color: themeColors.text, opacity: 0.5 }}>Trees Grown</span>
        </div>
      </div>

      {/* Settings & Environment Controls */}
      <div className="glass-panel p-4 rounded-3xl mt-auto space-y-4">
        <div className="flex items-center justify-between p-2 rounded-xl transition-colors">
          <div className="flex items-center gap-3">
            {isNight ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-yellow-500" />}
            <span className="text-sm font-medium" style={{ color: themeColors.text }}>Night Mode</span>
          </div>
          <button 
            onClick={() => setNight(!isNight)}
            className={`w-10 h-6 rounded-full transition-colors relative ${isNight ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <motion.div 
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
              animate={{ x: isNight ? 16 : 0 }}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl transition-colors">
          <div className="flex items-center gap-3">
            {isMuted ? <VolumeX size={20} style={{ color: themeColors.text, opacity: 0.5 }} /> : <Volume2 size={20} style={{ color: themeColors.primary }} />}
            <span className="text-sm font-medium" style={{ color: themeColors.text }}>Ambient Sounds</span>
          </div>
          <button 
            onClick={toggleMute}
            className={`w-10 h-6 rounded-full transition-colors relative ${!isMuted ? '' : 'bg-slate-300'}`}
            style={{ backgroundColor: !isMuted ? themeColors.primary : undefined }}
          >
            <motion.div 
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
              animate={{ x: !isMuted ? 16 : 0 }}
            />
          </button>
        </div>


        <div className="flex items-center gap-3 p-2 cursor-pointer rounded-xl transition-colors">
          <Settings size={20} style={{ color: themeColors.text, opacity: 0.5 }} />
          <span className="text-sm font-medium" style={{ color: themeColors.text }}>Manage Garden</span>
        </div>

        <button 
          onClick={() => {
            const audio = document.querySelector('audio');
            if (audio) {
              audio.muted = false;
              audio.play().catch(e => alert("Please interact with the page first or check browser settings."));
            }
          }}
          className="w-full py-2 text-[10px] uppercase font-bold rounded-lg border transition-colors"
          style={{ color: themeColors.primary, backgroundColor: themeColors.secondary, borderColor: `${themeColors.primary}33` }}
        >
          Troubleshoot Audio
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
