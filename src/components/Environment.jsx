import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import Tree from './Tree';

const Environment = () => {
  const { progress, isNight, gardenTheme } = useStore();

  return (
    <div className={`relative w-full h-full overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-indigo-950' : 'bg-emerald-50'}`}>
      {/* Sky Background Gradients */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isNight ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-900" />
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      <div className={`absolute inset-0 transition-opacity duration-1000 ${isNight ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-emerald-50 to-cozy-cream" />
        
        {/* Sun/Moon */}
        <motion.div
          className={`absolute w-20 h-20 rounded-full ${isNight ? 'bg-slate-200 shadow-[0_0_20px_white]' : 'bg-orange-200 shadow-[0_0_30px_orange]'}`}
          animate={{ 
            top: isNight ? '20%' : '15%', 
            left: isNight ? '80%' : '70%',
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Clouds */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-12 bg-white/60 rounded-full blur-md"
            style={{ top: `${10 + i * 15}%` }}
            animate={{ x: ['-20%', '120%'] }}
            transition={{ repeat: Infinity, duration: 40 + i * 10, ease: "linear" }}
          />
        ))}
      </div>

      {/* Mountains/Distant Hills */}
      <div className="absolute bottom-0 w-full h-1/2 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-[200%] left-[-50%] h-full opacity-30">
          <path 
            fill={isNight ? "#064e3b" : "#65a30d"} 
            d="M0,160L80,186.7C160,213,320,267,480,261.3C640,256,800,192,960,176C1120,160,1280,192,1360,208L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Ground */}
      <div className={`absolute bottom-0 w-full h-[15%] transition-colors duration-1000 ${isNight ? 'bg-[#1a2f15]' : 'bg-[#a3b18a]'}`}>
        <div className="absolute top-0 w-full h-4 bg-black/10 blur-sm" />
      </div>

      {/* Pond */}
      <motion.div 
        className="absolute bottom-[2%] right-[10%] w-64 h-24 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className={`absolute inset-0 rounded-[50%] blur-[2px] shadow-inner transition-colors duration-1000 ${isNight ? 'bg-indigo-900/60' : 'bg-sky-300/60'}`} />
        {/* Ripples */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-white/20 rounded-[50%]"
            animate={{ 
              scale: [1, 1.2],
              opacity: [0.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              delay: i * 1,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Rabbits (only if progress > 40 and not night) */}
      {progress > 40 && !isNight && [...Array(2)].map((_, i) => (
        <motion.div
          key={`rabbit-${i}`}
          className="absolute w-6 h-4 bg-white rounded-full z-20"
          initial={{ x: -50, bottom: '10%' }}
          animate={{ 
            x: i === 0 ? ['10%', '30%', '10%'] : ['90%', '70%', '90%'],
            y: [0, -15, 0]
          }}
          transition={{ 
            x: { repeat: Infinity, duration: 20, ease: "linear" },
            y: { repeat: Infinity, duration: 0.6, ease: "easeOut" }
          }}
        >
          {/* Ears */}
          <div className="absolute -top-3 left-1 w-1.5 h-4 bg-white rounded-full" />
          <div className="absolute -top-3 right-1 w-1.5 h-4 bg-white rounded-full" />
          {/* Eye */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full" />
        </motion.div>
      ))}

      {/* Bench */}
      <motion.div 
        className="absolute bottom-[10%] left-[15%] w-32 h-16 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Simple stylized bench */}
        <div className="absolute bottom-0 w-full h-2 bg-amber-900 rounded-full" />
        <div className="absolute bottom-2 left-2 w-1 h-6 bg-amber-900" />
        <div className="absolute bottom-2 right-2 w-1 h-6 bg-amber-900" />
        <div className="absolute bottom-6 w-full h-4 bg-amber-800 rounded-t-lg" />
      </motion.div>

      {/* Lanterns */}
      {[
        { left: '12%', bottom: '15%' },
        { left: '28%', bottom: '12%' }
      ].map((pos, i) => (
        <motion.div
          key={`lantern-${i}`}
          className="absolute z-20"
          style={{ left: pos.left, bottom: pos.bottom }}
        >
          {/* Post */}
          <div className="w-1 h-12 bg-slate-800" />
          {/* Lantern Head */}
          <motion.div 
            className={`w-4 h-6 -translate-x-1.5 -translate-y-2 rounded-sm relative ${isNight ? 'bg-orange-400' : 'bg-slate-700'}`}
          >
             {/* Glow */}
             {isNight && (
               <motion.div 
                 className="absolute inset-0 bg-yellow-400 blur-md rounded-full scale-150"
                 animate={{ opacity: [0.4, 0.8, 0.4] }}
                 transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
               />
             )}
             <div className="absolute inset-1 border border-white/20" />
          </motion.div>
        </motion.div>
      ))}

      {/* The Tree */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10">
        <Tree progress={progress} theme={gardenTheme} />
      </div>

      {/* Garden Elements based on progress */}
      <AnimatePresence>
        {progress > 20 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-[12%] left-[40%] z-20 flex gap-4"
          >
             {/* Flowers that grow with progress */}
             {[...Array(Math.floor(progress / 10))].map((_, i) => (
               <motion.div
                 key={`flower-${i}`}
                 className="relative"
                 initial={{ y: 20 }}
                 animate={{ y: 0 }}
                 whileHover={{ scale: 1.2 }}
               >
                  <div className="w-0.5 h-4 bg-emerald-600 mx-auto" />
                  <motion.div 
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ 
                      backgroundColor: ['#fb7185', '#f472b6', '#38bdf8', '#fbbf24'][i % 4],
                      marginTop: -4
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: i * 0.2 }}
                  />
               </motion.div>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Butterflies */}
      {progress > 60 && !isNight && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-sm z-30"
          animate={{
            x: [Math.random() * 100, Math.random() * 500, Math.random() * 200],
            y: [200, 100, 300],
            rotate: [0, 45, -45, 0]
          }}
          transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "linear" }}
        />
      ))}
      
      {/* Fireflies */}
      {isNight && [...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full z-30 shadow-[0_0_5px_yellow]"
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${60 + Math.random() * 30}%`, `${60 + Math.random() * 30}%`],
            opacity: [0, 0.8, 0]
          }}
          transition={{ repeat: Infinity, duration: 4 + Math.random() * 4, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default Environment;
