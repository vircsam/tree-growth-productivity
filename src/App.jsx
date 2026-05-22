import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from './components/Timer';
import Environment from './components/Environment';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GardenCustomizer from './components/GardenCustomizer';
import AmbientSounds from './components/AmbientSounds';
import { Footer } from './components/Footer';
import { useStore } from './store/useStore';
import { themes } from './store/themeConfig';

function App() {
  const { isNight, gardenTheme } = useStore();
  const currentTheme = themes[gardenTheme] || themes.spring;

  return (
    <div className={`w-full min-h-screen font-sans transition-colors duration-1000 ${isNight ? 'bg-[#0a0a0f]' : 'bg-[#FDFCF0]'}`}>
      <div className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row">
        <AmbientSounds />
        <Header />
        
        {/* Background Environment (Always bottom layer) */}
        <div className="absolute inset-0 z-0">
          <Environment />
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row pointer-events-none pt-24">
          
          {/* Sidebar: hidden or condensed on small screens, full on md+ */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex-shrink-0 w-full md:w-auto h-auto md:h-full flex flex-col pointer-events-auto"
          >
            <div className="md:h-full overflow-y-auto md:overflow-visible">
              <Sidebar />
            </div>
          </motion.div>


          {/* Center Side: Timer & Growth Focus */}
          <div className="flex-1 h-full flex flex-col items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pointer-events-auto scale-90 md:scale-100"
            >
              <Timer />
            </motion.div>
          </div>

          {/* Right Side: Spacer for desktop balance */}
          <div className="hidden xl:block w-64" />

        </div>

        {/* Bottom Toolbars */}
        <div className="absolute bottom-4 left-0 w-full z-20 pointer-events-none flex justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pointer-events-auto w-full max-w-md px-4"
          >
            <GardenCustomizer />
          </motion.div>
        </div>

        {/* Ambient Visual Overlays */}
        <AnimatePresence>
          {!isNight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{ 
                background: `radial-gradient(circle_at_center, ${currentTheme.environment.accent} 0%, transparent 70%)` 
              }}
            />
          )}
        </AnimatePresence>

        {/* Aesthetic Grain/Noise Effect */}
        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>
      
      {/* Footer is now part of the normal document flow and will be scrollable */}
      <Footer />
    </div>
  );
}

export default App;


