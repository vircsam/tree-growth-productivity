import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Settings, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';

const Sidebar = () => {
  const { xp, level, streak, isNight, setNight, isMuted, toggleMute, totalTreesGrown, audioMode, setAudioMode } = useStore();

  const xpToNextLevel = (level * 1000) - (xp % 1000);
  const progressToNextLevel = ((xp % 1000) / 1000) * 100;

  return (
    <div className="h-full flex flex-col gap-6 p-6 w-full max-w-xs">
      {/* Profile Card */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-br from-nature-300 to-nature-500 rounded-full flex items-center justify-center shadow-inner mb-4">
          <Trophy className="text-white w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-cozy-dark">Focus Master</h2>
        <p className="text-sm text-cozy-earth font-medium">Level {level}</p>
        
        {/* XP Bar */}
        <div className="w-full mt-4">
          <div className="flex justify-between text-[10px] uppercase font-bold text-cozy-earth/70 mb-1">
            <span>XP: {xp % 1000}</span>
            <span>Next: {xpToNextLevel}</span>
          </div>
          <div className="w-full h-2 bg-cozy-sage/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-nature-400 to-nature-500"
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
          <Flame className="text-orange-500 w-6 h-6 mb-1" />
          <span className="text-lg font-bold text-cozy-dark">{streak}</span>
          <span className="text-[10px] uppercase font-bold text-cozy-earth/50">Day Streak</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center mb-1">
             <div className="w-3 h-3 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-lg font-bold text-cozy-dark">{totalTreesGrown}</span>
          <span className="text-[10px] uppercase font-bold text-cozy-earth/50">Trees Grown</span>
        </div>
      </div>

      {/* Settings & Environment Controls */}
      <div className="glass-panel p-4 rounded-3xl mt-auto space-y-4">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-3">
            {isNight ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-yellow-500" />}
            <span className="text-sm font-medium text-cozy-dark">Night Mode</span>
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

        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-3">
            {isMuted ? <VolumeX size={20} className="text-cozy-earth/50" /> : <Volume2 size={20} className="text-nature-600" />}
            <span className="text-sm font-medium text-cozy-dark">Ambient Sounds</span>
          </div>
          <button 
            onClick={toggleMute}
            className={`w-10 h-6 rounded-full transition-colors relative ${!isMuted ? 'bg-nature-500' : 'bg-slate-300'}`}
          >
            <motion.div 
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
              animate={{ x: !isMuted ? 16 : 0 }}
            />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-2">
            <span className="text-[10px] uppercase font-bold text-cozy-earth/50">Audio Source</span>
            <div className="flex bg-cozy-sage/10 rounded-lg p-1">
                <button 
                    onClick={() => setAudioMode('ambient')}
                    className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${audioMode === 'ambient' ? 'bg-white shadow-sm text-nature-600' : 'text-cozy-earth'}`}
                >
                    Nature
                </button>
                <button 
                    onClick={() => setAudioMode('lofi')}
                    className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${audioMode === 'lofi' ? 'bg-white shadow-sm text-nature-600' : 'text-cozy-earth'}`}
                >
                    Lo-fi
                </button>
            </div>
        </div>

        <div className="flex items-center gap-3 p-2 cursor-pointer rounded-xl hover:bg-white/20 transition-colors">
          <Settings size={20} className="text-gray-500" />
          <span className="text-sm font-medium text-cozy-dark">Manage Garden</span>
        </div>

        <button 
          onClick={() => {
            const audio = document.querySelector('audio');
            if (audio) {
              audio.muted = false;
              audio.play().catch(e => alert("Please interact with the page first or check browser settings."));
            }
          }}
          className="w-full py-2 text-[10px] uppercase font-bold text-nature-600 bg-nature-50 rounded-lg border border-nature-200 hover:bg-nature-100 transition-colors"
        >
          Troubleshoot Audio
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
