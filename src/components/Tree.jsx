import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Tree = ({ progress, theme = 'spring' }) => {
  // Leaf and flower colors based on theme
  const colors = {
    spring: { leaves: ['#4ade80', '#22c55e', '#16a34a'], flowers: '#fb7185' },
    autumn: { leaves: ['#f87171', '#fb923c', '#facc15'], flowers: '#fecaca' },
    winter: { leaves: ['#e2e8f0', '#cbd5e1', '#94a3b8'], flowers: '#ffffff' },
    sakura: { leaves: ['#fbcfe8', '#f9a8d4', '#f472b6'], flowers: '#ffffff' },
  };

  const currentTheme = colors[theme] || colors.spring;

  // Generate branches once to maintain consistency during growth
  const branches = useMemo(() => {
    return [
      { id: 1, angle: -35, length: 60, startY: 0.4, scale: 0.7 },
      { id: 2, angle: 30, length: 70, startY: 0.5, scale: 0.8 },
      { id: 3, angle: -20, length: 50, startY: 0.7, scale: 0.6 },
      { id: 4, angle: 25, length: 40, startY: 0.8, scale: 0.5 },
    ];
  }, []);

  // Leaf cluster positions
  const leafClusters = useMemo(() => {
    return [...Array(24)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 100 - 40,
      size: 15 + Math.random() * 25,
      delay: Math.random() * 2,
      color: currentTheme.leaves[Math.floor(Math.random() * currentTheme.leaves.length)]
    }));
  }, [theme]);

  // Flower positions
  const flowerPositions = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 140,
      y: (Math.random() - 0.5) * 110 - 50,
      delay: 1 + Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative flex items-end justify-center w-80 h-[400px]">
      {/* Seed Stage */}
      {progress < 5 && (
        <motion.div 
          className="absolute bottom-0 w-5 h-4 bg-amber-900 rounded-full shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}

      {/* Main Trunk */}
      <motion.div 
        className="absolute bottom-0 w-6 bg-[#451a03] rounded-t-full origin-bottom z-10"
        animate={{ 
          height: Math.min(progress * 2.5, 180),
          width: 6 + (progress / 15),
          rotate: [0, -1, 0, 1, 0]
        }}
        transition={{ 
          height: { type: 'spring', stiffness: 40 },
          rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
        }}
      >
        {/* Branching Logic */}
        {progress > 30 && branches.map((branch) => (
          <motion.div
            key={branch.id}
            className="absolute w-2 bg-[#451a03] rounded-full origin-bottom"
            style={{ 
              bottom: `${branch.startY * 100}%`,
              left: '50%',
              marginLeft: '-4px'
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
            {progress > 50 && [...Array(3)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute rounded-full blur-[1px]"
                style={{
                  width: 20,
                  height: 15,
                  backgroundColor: currentTheme.leaves[j % 3],
                  top: -10 - (j * 10),
                  left: -5 + (j * 5),
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
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
            y: -Math.min(progress * 2.5, 180) + 20,
            scale: Math.min((progress - 15) / 60, 1.2)
          }}
        >
          {/* Detailed Leaf Clusters */}
          {leafClusters.map((leaf) => (
            <motion.div
              key={leaf.id}
              className="absolute rounded-full shadow-sm"
              style={{
                width: leaf.size,
                height: leaf.size * 0.8,
                backgroundColor: leaf.color,
                left: leaf.x,
                top: leaf.y,
                opacity: 0.9,
                filter: 'blur(0.5px)',
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, 5, -5, 0],
                x: leaf.x + (Math.sin(leaf.id) * 5)
              }}
              transition={{ 
                scale: { delay: leaf.delay },
                rotate: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" }
              }}
            />
          ))}

          {/* Flowers */}
          {progress > 85 && flowerPositions.map((flower) => (
            <motion.div
              key={flower.id}
              className="absolute w-4 h-4 z-30"
              style={{ left: flower.x, top: flower.y }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: flower.delay, type: 'spring' }}
            >
              <div className="absolute inset-0 bg-white rounded-full blur-[1px]" />
              <div className="absolute inset-1 rounded-full shadow-lg" style={{ backgroundColor: currentTheme.flowers }} />
              <div className="absolute inset-[30%] bg-yellow-400 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Ground & Roots Effect */}
      <div className="absolute bottom-[-15px] w-48 h-10 bg-[#2d1a0a]/30 rounded-[50%] blur-md z-0" />
      <motion.div 
        className="absolute bottom-0 w-32 h-2 bg-[#3f2009] rounded-full blur-[1px] z-0"
        animate={{ scaleX: 1 + progress/100 }}
      />
    </div>
  );
};

export default Tree;

