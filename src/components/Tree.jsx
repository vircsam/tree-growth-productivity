import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Tree = ({ progress, theme = 'spring' }) => {
  // Leaf and flower colors based on theme - More vibrant
  const colors = {
    spring: { leaves: ['#4ade80', '#22c55e', '#16a34a', '#86efac'], flowers: '#fb7185' },
    autumn: { leaves: ['#f87171', '#fb923c', '#facc15', '#b91c1c'], flowers: '#fecaca' },
    winter: { leaves: ['#f8fafc', '#cbd5e1', '#94a3b8', '#e2e8f0'], flowers: '#ffffff' },
    sakura: { leaves: ['#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899'], flowers: '#ffffff' },
  };

  const currentTheme = colors[theme] || colors.spring;

  // Generate branches once to maintain consistency during growth - Larger branches
  const branches = useMemo(() => {
    return [
      { id: 1, angle: -45, length: 90, startY: 0.35, scale: 0.8 },
      { id: 2, angle: 40, length: 110, startY: 0.45, scale: 0.9 },
      { id: 3, angle: -30, length: 80, startY: 0.6, scale: 0.75 },
      { id: 4, angle: 35, length: 70, startY: 0.75, scale: 0.6 },
      { id: 5, angle: -15, length: 50, startY: 0.85, scale: 0.5 },
    ];
  }, []);

  // Leaf cluster positions - More clusters
  const leafClusters = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 180,
      y: (Math.random() - 0.5) * 140 - 60,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 1.5,
      color: currentTheme.leaves[Math.floor(Math.random() * currentTheme.leaves.length)]
    }));
  }, [theme]);

  // Flower positions - More flowers
  const flowerPositions = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 160 - 80,
      delay: 1 + Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative flex items-end justify-center w-[400px] h-[500px]">
      {/* Seed Stage */}
      {progress < 5 && (
        <motion.div 
          className="absolute bottom-0 w-8 h-6 bg-amber-900 rounded-full shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}

      {/* Main Trunk - Bigger and thicker */}
      <motion.div 
        className="absolute bottom-0 w-10 bg-[#3f1f0a] rounded-t-full origin-bottom z-10 shadow-lg"
        animate={{ 
          height: Math.min(progress * 3, 240),
          width: 10 + (progress / 10),
          rotate: [0, -0.5, 0, 0.5, 0]
        }}
        transition={{ 
          height: { type: 'spring', stiffness: 40 },
          rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" }
        }}
      >
        {/* Branching Logic */}
        {progress > 30 && branches.map((branch) => (
          <motion.div
            key={branch.id}
            className="absolute w-3 bg-[#3f1f0a] rounded-full origin-bottom shadow-md"
            style={{ 
              bottom: `${branch.startY * 100}%`,
              left: '50%',
              marginLeft: '-6px'
            }}
            initial={{ height: 0, rotate: 0 }}
            animate={{ 
              height: Math.min((progress - 30) * branch.length / 50, branch.length),
              rotate: branch.angle,
              scale: branch.scale
            }}
            transition={{ type: 'spring', stiffness: 30 }}
          >
            {/* Secondary Leaves on Branches */}
            {progress > 50 && [...Array(4)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute rounded-full blur-[0.5px]"
                style={{
                  width: 30,
                  height: 20,
                  backgroundColor: currentTheme.leaves[j % currentTheme.leaves.length],
                  top: -15 - (j * 12),
                  left: (j % 2 === 0 ? -10 : 5) + (j * 3),
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 2, -2, 0] }}
                transition={{ delay: 0.2 + (j * 0.1), rotate: { repeat: Infinity, duration: 3 } }}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Main Canopy */}
      {progress > 15 && (
        <motion.div 
          className="absolute origin-bottom z-20"
          animate={{ 
            y: -Math.min(progress * 3, 240) + 30,
            scale: Math.min((progress - 10) / 50, 1.4)
          }}
        >
          {/* Detailed Leaf Clusters */}
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
                opacity: 0.95,
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, 3, -3, 0],
                x: leaf.x + (Math.sin(leaf.id) * 8)
              }}
              transition={{ 
                scale: { delay: leaf.delay },
                rotate: { repeat: Infinity, duration: 5 + Math.random() * 3, ease: "easeInOut" }
              }}
            />
          ))}

          {/* Flowers */}
          {progress > 75 && flowerPositions.map((flower) => (
            <motion.div
              key={flower.id}
              className="absolute w-6 h-6 z-30"
              style={{ left: flower.x, top: flower.y }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: flower.delay, type: 'spring' }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-[2px]" />
              <div className="absolute inset-[10%] rounded-full shadow-xl" style={{ backgroundColor: currentTheme.flowers }} />
              <div className="absolute inset-[35%] bg-yellow-400 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Ground & Roots Effect */}
      <div className="absolute bottom-[-20px] w-64 h-12 bg-[#1a0f05]/40 rounded-[50%] blur-lg z-0" />
      <motion.div 
        className="absolute bottom-0 w-40 h-3 bg-[#2d1a0a] rounded-full blur-[1px] z-0 shadow-inner"
        animate={{ scaleX: 1 + progress/80 }}
      />
    </div>
  );
};

export default Tree;

