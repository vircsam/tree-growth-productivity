import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Timer State
      timeLeft: 25 * 60,
      totalTime: 25 * 60,
      isActive: false,
      isPaused: false,
      progress: 0, // 0 to 100
      
      // User Progress
      xp: 0,
      level: 1,
      streak: 0,
      totalTreesGrown: 0,
      lastActive: null,
      
      // Garden State
      unlockedItems: ['grass'],
      activeItems: ['grass'],
      gardenTheme: 'spring', // spring, autumn, winter, sakura
      isNight: false,
      
      // Settings
      soundVolume: 0.5,
      isMuted: false,
      audioMode: 'ambient', // ambient, lofi

      // Actions
      setAudioMode: (mode) => set({ audioMode: mode }),
      setTimer: (minutes) => set({ 
        totalTime: minutes * 60, 
        timeLeft: minutes * 60, 
        progress: 0, 
        isActive: false 
      }),
      
      startTimer: () => set({ isActive: true, isPaused: false }),
      
      pauseTimer: () => set({ isPaused: true }),
      
      resetTimer: () => set((state) => ({ 
        timeLeft: state.totalTime, 
        progress: 0, 
        isActive: false, 
        isPaused: false 
      })),
      
      tick: () => set((state) => {
        if (!state.isActive || state.isPaused) return state;
        
        const newTime = Math.max(0, state.timeLeft - 1);
        const newProgress = ((state.totalTime - newTime) / state.totalTime) * 100;
        
        if (newTime === 0) {
          // Timer Finished - Tree is fully grown
          const baseSessionXp = Math.floor(state.totalTime / 60) * 10;
          const treesGrownBonus = (state.totalTreesGrown + 1) * 20; // Bonus for each tree grown so far
          const totalSessionXp = baseSessionXp + treesGrownBonus;
          
          return {
            timeLeft: 0,
            progress: 100,
            isActive: false,
            totalTreesGrown: state.totalTreesGrown + 1,
            xp: state.xp + totalSessionXp,
            level: Math.floor((state.xp + totalSessionXp) / 1000) + 1
          };
        }
        
        return { 
          timeLeft: newTime,
          progress: newProgress
        };
      }),

      setNight: (isNight) => set({ isNight }),
      
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      
      unlockItem: (itemId) => set((state) => ({
        unlockedItems: [...state.unlockedItems, itemId]
      })),
      
      toggleItem: (itemId) => set((state) => {
        const activeItems = state.activeItems.includes(itemId)
          ? state.activeItems.filter(id => id !== itemId)
          : [...state.activeItems, itemId];
        return { activeItems };
      }),

      setGardenTheme: (theme) => set({ gardenTheme: theme })
    }),
    {
      name: 'tree-growth-storage',
      partialize: (state) => ({ 
        xp: state.xp, 
        level: state.level, 
        streak: state.streak, 
        totalTreesGrown: state.totalTreesGrown,
        lastActive: state.lastActive,
        unlockedItems: state.unlockedItems,
        activeItems: state.activeItems,
        gardenTheme: state.gardenTheme
      }),
    }
  )
);
