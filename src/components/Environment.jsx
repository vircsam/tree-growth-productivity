import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import Tree from './Tree';

const SmokeParticle = ({ i }) => (
  <motion.div
    className="absolute w-5 h-5 bg-slate-400 rounded-full blur-[6px] pointer-events-none"
    style={{ top: -20, left: 30 }}
    animate={{ 
      y: [-20, -120],
      x: [0, (Math.sin(i) * 30)],
      scale: [1, 4],
      opacity: [0.5, 0]
    }}
    transition={{ 
      repeat: Infinity, 
      duration: 4 + Math.random() * 2, 
      delay: i * 0.9,
      ease: "easeOut"
    }}
  />
);

const Cottage = ({ isNight }) => (
  <motion.div 
    className="absolute bottom-[10%] right-[15%] w-64 h-64 z-10 pointer-events-none"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    {/* Chimney with Smoke */}
    <div className={`absolute top-4 right-14 w-8 h-20 transition-colors duration-1000 ${isNight ? 'bg-slate-900' : 'bg-[#422006]'} overflow-visible`}>
       {[...Array(5)].map((_, i) => (
         <SmokeParticle key={i} i={i} />
       ))}
    </div>

    {/* House Body */}
    <div className={`absolute bottom-0 w-full h-40 rounded-sm shadow-2xl transition-colors duration-1000 ${isNight ? 'bg-slate-800' : 'bg-[#d8c3b0]'}`}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-24 bg-[#3f2009] rounded-t-2xl border-x-4 border-t-4 border-black/20" />
      
      {/* Windows with Night Glow */}
      {[ { left: '15%' }, { right: '15%' } ].map((pos, i) => (
        <motion.div 
          key={i}
          className={`absolute top-10 w-12 h-14 border-4 border-[#2d1a0a] shadow-2xl transition-all duration-1000 ${isNight ? 'bg-yellow-300 shadow-[0_0_25px_#f59e0b]' : 'bg-sky-50'}`}
          style={{ ...pos }}
          animate={isNight ? { opacity: [0.8, 1, 0.8] } : {}}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      ))}
    </div>

    {/* Roof */}
    <div className={`absolute top-0 w-[115%] -left-[7.5%] h-32 transition-colors duration-1000 ${isNight ? 'bg-[#1e1b4b]' : 'bg-[#6a2d12]'} shadow-2xl`}
         style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
</motion.div>
);

const Environment = () => {
  const { progress, gardenTheme, isNight } = useStore();

  return (
    <div className={`relative w-full h-full overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-[#0a0f1e]' : 'bg-sky-100'}`}>
      
      {/* Sky Atmosphere */}
      <div className={`absolute inset-0 transition-opacity duration-1500 ${isNight ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#1e1b4b] to-[#0f172a]" />
      </div>

      {/* Sun/Moon */}
      <motion.div 
        className={`absolute top-10 right-10 w-24 h-24 rounded-full shadow-2xl transition-all duration-1000 ${isNight ? 'bg-slate-200 shadow-[0_0_30px_white]' : 'bg-yellow-400'}`}
        animate={{ y: isNight ? [10, 0, 10] : [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Ground */}
      <div className={`absolute bottom-0 w-full h-[15%] transition-colors duration-1000 ${isNight ? 'bg-[#162713]' : 'bg-[#98a67e]'}`}>
        <div className="absolute top-0 w-full h-5 bg-black/5 blur-sm" />
      </div>

      {/* Pond */}
      <motion.div 
        className="absolute bottom-[2%] right-[5%] w-80 h-32 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={`absolute inset-0 rounded-[50%] blur-[2px] transition-colors duration-1000 shadow-inner ${isNight ? 'bg-indigo-900/50' : 'bg-sky-300/50'}`} />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-white/20 rounded-[50%]"
            animate={{ scale: [1, 1.2], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: i * 1.3 }}
          />
        ))}
      </motion.div>

      {/* Cottage next to pond */}
      <Cottage isNight={isNight} />

      {/* Tree */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10">
        <Tree progress={progress} theme={gardenTheme} />
      </div>

      {/* Ambience Fireflies */}
      {isNight && [...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-yellow-100 rounded-full z-30 shadow-[0_0_12px_#fef08a]"
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${40 + Math.random() * 50}%`, `${40 + Math.random() * 50}%`],
            opacity: [0, 1, 0]
          }}
          transition={{ repeat: Infinity, duration: 6 + Math.random() * 6 }}
        />
      ))}
    </div>
  );
};

export default Environment;