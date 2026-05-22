import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { themes, nightTheme } from '../store/themeConfig';

const Timer = () => {
  const { 
    timeLeft, 
    totalTime, 
    isActive, 
    isPaused, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick,
    setTimer,
    gardenTheme,
    isNight
  } = useStore();

  const currentTheme = isNight ? nightTheme : (themes[gardenTheme] || themes.spring);
  const themeColors = currentTheme.ui;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(totalTime / 60);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, tick]);

  const handleTimeSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const mins = parseInt(editValue);
      if (!isNaN(mins) && mins > 0 && mins <= 180) {
        setTimer(mins);
      }
      setIsEditing(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = ((totalTime - timeLeft) / totalTime) * 100;
  
  // SVG Circle properties
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-8 glass-panel p-8 rounded-3xl w-full max-w-sm">
      <div className="relative flex items-center justify-center">
        {/* Progress Circle */}
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            style={{ color: themeColors.secondary, opacity: 0.3 }}
          />
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: "linear" }}
            style={{ color: themeColors.primary }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isEditing && !isActive ? (
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleTimeSubmit}
              onBlur={handleTimeSubmit}
              autoFocus
              className="w-20 text-center text-4xl font-bold bg-transparent border-b-2 outline-none"
              style={{ color: themeColors.text, borderColor: themeColors.primary }}
            />
          ) : (
            <span 
              onClick={() => !isActive && setIsEditing(true)}
              className={`text-4xl font-bold font-sans tracking-tight text-cozy-dark ${!isActive ? 'cursor-edit hover:text-nature-600 transition-colors' : ''}`}
            >
              {formatTime(timeLeft)}
            </span>
          )}
          <span className="text-xs uppercase tracking-widest font-medium mt-1" style={{ color: themeColors.text, opacity: 0.6 }}>
            {isActive ? (isPaused ? 'Paused' : 'Focusing') : 'Ready'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button 
          onClick={resetTimer}
          className="p-3 rounded-full transition-colors"
          style={{ color: themeColors.text }}
          title="Reset"
        >
          <RotateCcw size={24} />
        </button>

        {!isActive || isPaused ? (
          <button 
            onClick={startTimer}
            className="p-5 rounded-full text-white shadow-lg transition-all transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: themeColors.primary }}
            title="Start"
          >
            <Play size={32} fill="currentColor" />
          </button>
        ) : (
          <button 
            onClick={pauseTimer}
            className="p-5 rounded-full text-white shadow-lg transition-all transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: themeColors.accent }}
            title="Pause"
          >
            <Pause size={32} fill="currentColor" />
          </button>
        )}

        <div className="relative group">
          <button className="p-3 rounded-full transition-colors" style={{ color: themeColors.text }}>
            <Clock size={24} />
          </button>
          
          {/* Quick Timer Presets */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:flex flex-col gap-2 p-3 glass-panel rounded-xl min-w-[100px] z-50">
            {[10, 25, 50, 90].map((mins) => (
              <button
                key={mins}
                onClick={() => setTimer(mins)}
                className="py-1 px-2 rounded text-sm font-medium transition-colors text-center"
                style={{ color: themeColors.text }}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Session Progress Bar */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: themeColors.secondary, opacity: 0.3 }}>
        <motion.div 
          className="h-full"
          style={{ backgroundColor: themeColors.primary }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
