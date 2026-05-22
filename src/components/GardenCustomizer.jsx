import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { themes as themeConfigs, nightTheme } from '../store/themeConfig';
import { Palmtree, Flower2, Home, Waves, Lamp } from 'lucide-react';

const GardenCustomizer = () => {
  const { gardenTheme, setGardenTheme, activeItems, toggleItem, isNight } = useStore();

  const currentTheme = isNight ? nightTheme : (themeConfigs[gardenTheme] || themeConfigs.spring);
  const themeColors = currentTheme.ui;

  const themes = [
    { id: 'spring', label: 'Spring', icon: <Palmtree size={20} />, color: 'bg-emerald-100' },
    { id: 'autumn', label: 'Autumn', icon: <Flower2 size={20} />, color: 'bg-orange-100' },
    { id: 'winter', label: 'Winter', icon: <Waves size={20} />, color: 'bg-blue-100' },
    { id: 'sakura', label: 'Sakura', icon: <Flower2 size={20} />, color: 'bg-pink-100' },
  ];

  const decorations = [
    { id: 'bench', label: 'Bench', icon: <Home size={18} /> },
    { id: 'lanterns', label: 'Lanterns', icon: <Lamp size={18} /> },
    { id: 'pond', label: 'Pond', icon: <Waves size={18} /> },
  ];

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-8">
        {/* Theme Selector */}
        <div className="flex items-center gap-2 pr-8 border-r border-cozy-sage/30">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setGardenTheme(theme.id)}
              className={`p-2 rounded-full transition-all relative ${gardenTheme === theme.id ? 'scale-110 shadow-sm' : 'opacity-40 hover:opacity-100'}`}
              title={theme.label}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme.color} text-cozy-dark`}>
                {theme.icon}
              </div>
              {gardenTheme === theme.id && (
                <motion.div 
                  layoutId="activeTheme"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: themeColors.primary }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Decorations Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase font-bold text-cozy-earth/50 tracking-widest">Decor</span>
          <div className="flex items-center gap-2">
            {decorations.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeItems.includes(item.id) 
                    ? 'text-white' 
                    : 'bg-black/5 text-gray-500 hover:bg-black/10'
                }`}
                style={{ backgroundColor: activeItems.includes(item.id) ? themeColors.primary : undefined }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenCustomizer;
