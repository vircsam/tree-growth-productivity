import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { themes } from '../store/themeConfig';

const Header = () => {
  const { isNight, gardenTheme } = useStore();
  const currentTheme = themes[gardenTheme] || themes.spring;
  const themeColors = currentTheme.ui;

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-0 left-0 w-full z-30 p-4 md:p-6 flex justify-between items-center pointer-events-none"
    >
      <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shadow-lg border-2" style={{ borderColor: themeColors.primary }}>
          <img src="season.png" alt="SeasonCycle" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r" 

            style={{ 
              backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.accent})`,
              color: isNight ? '#fff' : undefined
            }}>
          SeasonCycle
        </h1>
      </div>
      
    </motion.header>
  );
};

export default Header;
