export const themes = {
  spring: {
    tree: {
      leaves: ['#22c55e', '#16a34a', '#15803d', '#86efac'],
      flowers: '#fb7185',
      bark: '#4a2c14',
    },
    environment: {
      sky: 'from-sky-200 via-sky-100 to-white',
      ground: 'bg-[#98a67e]',
      accent: '#fbbf24', // Sun glow
    },
    cottage: {
      body: 'bg-[#d8c3b0]',
      roof: 'bg-[#6a2d12]',
      chimney: 'bg-[#422006]',
      window: 'bg-sky-50',
    }
  },
  autumn: {
    tree: {
      leaves: ['#f59e0b', '#ea580c', '#dc2626', '#b45309'],
      flowers: '#fed7aa',
      bark: '#3b1f0b',
    },
    environment: {
      sky: 'from-orange-200 via-orange-100 to-amber-50',
      ground: 'bg-[#78350f]',
      accent: '#f59e0b', // Warm autumn sun
    },
    cottage: {
      body: 'bg-[#b4a08c]',
      roof: 'bg-[#7c2d12]',
      chimney: 'bg-[#451a03]',
      window: 'bg-orange-50',
    }
  },
  winter: {
    tree: {
      leaves: ['#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8'],
      flowers: '#f8fafc',
      bark: '#1f2937',
    },
    environment: {
      sky: 'from-slate-300 via-slate-100 to-white',
      ground: 'bg-[#f1f5f9]',
      accent: '#94a3b8', // Cold winter sun
    },
    cottage: {
      body: 'bg-[#94a3b8]',
      roof: 'bg-[#1e293b]',
      chimney: 'bg-[#0f172a]',
      window: 'bg-blue-50',
    }
  },
  sakura: {
    tree: {
      leaves: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e'],
      flowers: '#ffe4ec',
      bark: '#4c1d95',
    },
    environment: {
      sky: 'from-pink-200 via-[#fff1f2] to-white',
      ground: 'bg-[#fbcfe8]',
      accent: '#fda4af', // Soft sakura glow
    },
    cottage: {
      body: 'bg-[#fce7f3]',
      roof: 'bg-[#be185d]',
      chimney: 'bg-[#831843]',
      window: 'bg-pink-50',
    }
  }
};

export const nightTheme = {
  sky: 'from-[#020617] via-[#1e1b4b] to-[#0f172a]',
  ground: 'bg-[#162713]',
  accent: '#fef08a', // Firefly/Moon glow
  cottage: {
    body: 'bg-slate-800',
    roof: 'bg-[#1e1b4b]',
    chimney: 'bg-slate-900',
    window: 'bg-yellow-300 shadow-[0_0_25px_#f59e0b]',
  }
};
