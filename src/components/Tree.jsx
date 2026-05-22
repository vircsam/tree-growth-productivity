import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Tree = ({ progress, theme = 'spring' }) => {
  // Leaf and flower colors based on theme - Ultra Vibrant
  const colors = {
    spring: { leaves: ['#22c55e', '#16a34a', '#15803d', '#86efac'], flowers: '#fb7185', bark: '#451a03' },
    autumn: { leaves: ['#f87171', '#fb923c', '#ea580c', '#b91c1c'], flowers: '#fecaca', bark: '#422006' },
    winter: { leaves: ['#f1f5f9', '#cbd5e1', '#94a3b8', '#ffffff'], flowers: '#e2e8f0', bark: '#2d1a0a' },
    sakura: { leaves: ['#fbcfe8', '#f9a8d4', '#f472b6', '#db2777'], flowers: '#ffffff', bark: '#4c1d95' },
  };

  const currentTheme = colors[theme] || colors.spring;

  // Complex branch structure
  const branches = useMemo(() => {
    return [
      { id: 1, angle: -45, length: 100, startY: 0.3, scale: 0.85, lantern: true },
      { id: 2, angle: 45, length: 120, startY: 0.4, scale: 0.95 },
      { id: 3, angle: -25, length: 90, startY: 0.55, scale: 0.8, lantern: true },
      { id: 4, angle: 35, length: 85, startY: 0.7, scale: 0.7 },
      { id: 5, angle: -10, length: 70, startY: 0.8, scale: 0.6, lantern: true },
    ];
  }, []);

  // Dense leaf cluster positions
  const leafClusters = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 180 - 80,
      size: 25 + Math.random() * 45,
      delay: Math.random() * 1.5,
      color: currentTheme.leaves[Math.floor(Math.random() * currentTheme.leaves.length)]
    }));
  }, [theme]);

  // Root system
  const roots = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: i,
      angle: (i * 60) + (Math.random() * 20),
      length: 40 + Math.random() * 40,
      width: 4 + Math.random() * 4
    }));
  }, []);

  return (
    <div className="relative flex items-end justify-center w-[500px] h-[700px]">
      
      {/* Roots - Gnarly spreading roots */}
      {progress > 20 && roots.map((root) => (
        <motion.div
          key={`root-${root.id}`}
          className="absolute bottom-0 w-2 origin-bottom rounded-full"
          style={{ 
            backgroundColor: currentTheme.bark,
            width: root.width,
            left: '50%',
            marginLeft: -root.width/2
          }}
          initial={{ height: 0, rotate: root.angle }}
          animate={{ height: Math.min((progress-20) * root.length / 80, root.length) }}
          transition={{ type: 'spring', stiffness: 20 }}
        />
      ))}

      {/* Main Trunk - Massive and textured */}
      <motion.div 
        className="absolute bottom-0 w-16 origin-bottom z-10 overflow-hidden"
        style={{ backgroundColor: currentTheme.bark, borderRadius: '40% 40% 10% 10% / 100% 100% 0% 0%' }}
        animate={{ 
          height: Math.min(progress * 5, 400),
          width: 16 + (progress / 6),
        }}
        transition={{ height: { type: 'spring', stiffness: 30 } }}
      >
        {/* Bark Texture Detail */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-full h-1 bg-black/20" 
            style={{ top: `${i * 15}%`, opacity: 0.3, transform: 'skewY(-5deg)' }} 
          />
        ))}
      </motion.div>

      {/* Branches */}
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
        >
           {/* Lanterns hanging from branches */}
           {branch.lantern && progress > 50 && (
             <motion.div 
               className="absolute top-full -translate-x-1/2 w-4 h-6"
               style={{ left: '50%' }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
             >
                <div className="w-0.5 h-4 bg-slate-800 mx-auto" />
                <motion.div 
                   className="w-4 h-5 rounded-sm bg-orange-400 relative border border-orange-600 shadow-[0_0_15px_orange]"
                   animate={{ rotate: [-5, 5, -5], opacity: [0.8, 1, 0.8] }}
                   transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                >
                   <div className="absolute inset-1 bg-yellow-200/50" />
                </motion.div>
             </motion.div>
           )}
        </motion.div>
      ))}
      
      {/* Canopy Container */}
      <motion.div 
        className="absolute origin-bottom z-20"
        animate={{ 
          y: -Math.min(progress * 5, 400) + 50,
          scale: Math.min((progress - 5) / 40, 1.6)
        }}
        transition={{ type: 'spring', stiffness: 20 }}
      >
        {/* Leaf Clusters - Dense and Layered */}
        {leafClusters.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute rounded-full shadow-2xl"
            style={{
              width: leaf.size,
              height: leaf.size * 0.95,
              backgroundColor: leaf.color,
              left: leaf.x,
              top: leaf.y,
              opacity: 0.98,
              border: `1px solid ${leaf.color}33`
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              rotate: [0, 2, -2, 0],
              x: leaf.x + (Math.sin(leaf.id) * 12)
            }}
            transition={{ 
              scale: { delay: leaf.delay, type: 'spring' },
              rotate: { repeat: Infinity, duration: 6 + Math.random() * 4, ease: "easeInOut" }
            }}
          />
        ))}

        {/* Flowers - Large and Blooming */}
        {progress > 65 && [...Array(20)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute w-7 h-7 z-30"
            style={{ 
               left: (Math.random() - 0.5) * 240, 
               top: (Math.random() - 0.5) * 180 - 100 
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + Math.random() * 3, type: 'spring' }}
          >
            <div className="absolute inset-0 bg-white/40 rounded-full blur-[2px]" />
            <div className="absolute inset-[15%] rounded-full shadow-xl" style={{ backgroundColor: currentTheme.flowers }} />
            <div className="absolute inset-[40%] bg-yellow-300 rounded-full" />
          </motion.div>
        ))}
      </motion.div>

      {/* Base shadow and soil */}
      <div className="absolute bottom-[-30px] w-[300px] h-20 bg-[#1a0f05]/50 rounded-[50%] blur-2xl z-0" />
    </div>
  );
};

export default Tree;

