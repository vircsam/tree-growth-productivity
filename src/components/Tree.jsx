import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Tree = ({ progress, theme = 'spring' }) => {
  // Theme colors - Premium vibrant palettes
  const colors = {
    spring: { leaves: ['#22c55e', '#16a34a', '#15803d', '#86efac'], flowers: '#fb7185', bark: '#3f2009' },
    autumn: { leaves: ['#ea580c', '#c2410c', '#9a3412', '#f97316'], flowers: '#fecaca', bark: '#2d1a0a' },
    winter: { leaves: ['#f8fafc', '#cbd5e1', '#94a3b8', '#e2e8f0'], flowers: '#ffffff', bark: '#1e293b' },
    sakura: { leaves: ['#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899'], flowers: '#ffffff', bark: '#312e81' },
  };

  const currentTheme = colors[theme] || colors.spring;

  // Simple, clean branch structure
  const branches = useMemo(() => {
    return [
      { id: 1, angle: -40, length: 100, startY: 0.4, scale: 0.9 },
      { id: 2, angle: 35, length: 110, startY: 0.5, scale: 0.85 },
      { id: 3, angle: -20, length: 80, startY: 0.7, scale: 0.7 },
    ];
  }, []);

  // Canopy clustered strictly at the top
  const leafClusters = useMemo(() => {
    // Narrower base clusters shifted upwards
    const base = [...Array(150)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 180, // Narrower spread
      y: (Math.random() - 0.5) * 140 - 150, // Shifted upwards
      size: 35 + Math.random() * 55,
      delay: Math.random() * 2,
      color: currentTheme.leaves[i % currentTheme.leaves.length]
    }));

    // Top layer - Extra dense arc
    const top = [...Array(120)].map((_, i) => ({
      id: i + 150,
      x: (Math.random() - 0.5) * 150, // Very focused top
      y: (Math.random() * -60) - 190, // High altitude
      size: 25 + Math.random() * 40,
      delay: 1 + Math.random() * 1.5,
      color: currentTheme.leaves[Math.floor(Math.random() * currentTheme.leaves.length)]
    }));

    return [...base, ...top];
  }, [theme]);

  return (
    <div className="relative flex items-end justify-center w-[600px] h-[800px]">
      
      {/* Soil / Base Shadow */}
      <div className="absolute bottom-[-20px] w-64 h-12 bg-black/20 rounded-full blur-xl z-0" />

      {/* Main Trunk - Clean and robust */}
      <motion.div 
        className="absolute bottom-0 w-14 origin-bottom z-10 shadow-2xl"
        style={{ backgroundColor: currentTheme.bark, borderRadius: '20px 20px 0 0' }}
        animate={{ 
          height: Math.min(progress * 5, 400),
          width: 14 + (progress / 10)
        }}
        transition={{ type: 'spring', stiffness: 30 }}
      >
         {/* Subtle bark shadow */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </motion.div>

      {/* Primary Branches */}
      {progress > 30 && branches.map((branch) => (
        <motion.div
          key={branch.id}
          className="absolute origin-bottom z-10"
          style={{ 
            width: 8,
            backgroundColor: currentTheme.bark,
            borderRadius: '4px',
            bottom: `${branch.startY * Math.min(progress * 5, 400)}px`,
            left: '50%',
            marginLeft: '-4px'
          }}
          initial={{ height: 0, rotate: 0 }}
          animate={{ 
            height: Math.min((progress - 30) * branch.length / 50, branch.length),
            rotate: branch.angle,
            scale: branch.scale
          }}
          transition={{ type: 'spring', stiffness: 25 }}
        />
      ))}
      
      {/* Ultra-Dense Canopy */}
      {progress > 15 && (
        <motion.div 
          className="absolute origin-bottom z-20"
          animate={{ 
            y: -Math.min(progress * 5, 400) + 60,
            scale: Math.min((progress - 5) / 30, 1.5)
          }}
        >
          {leafClusters.map((leaf) => (
            <motion.div
              key={leaf.id}
              className="absolute rounded-full shadow-lg"
              style={{
                width: leaf.size,
                height: leaf.size * 0.9,
                backgroundColor: leaf.color,
                left: leaf.x,
                top: leaf.y,
                opacity: 0.98,
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, 1.5, -1.5, 0],
                x: leaf.x + (Math.sin(leaf.id) * 8)
              }}
              transition={{ 
                scale: { delay: leaf.delay, type: 'spring', stiffness: 100 },
                rotate: { repeat: Infinity, duration: 5 + Math.random() * 5, ease: "easeInOut" }
              }}
            />
          ))}

          {/* Achieving Flowers */}
          {progress > 75 && [...Array(25)].map((_, i) => (
            <motion.div
              key={`flower-${i}`}
              className="absolute w-6 h-6 z-30"
              style={{ 
                 left: (Math.random() - 0.5) * 280, 
                 top: (Math.random() - 0.5) * 240 - 120 
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + Math.random() * 2 }}
            >
              <div className="absolute inset-0 bg-white/40 rounded-full blur-[2px]" />
              <div className="absolute inset-[20%] rounded-full shadow-lg" style={{ backgroundColor: currentTheme.flowers }} />
              <div className="absolute inset-[40%] bg-yellow-300 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Tree;