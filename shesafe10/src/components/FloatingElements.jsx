function FloatingElements() {
  const elements = [
    { shape: 'circle', position: 'top-20 left-10', delay: '0s', size: 'w-16 h-16', color: 'violet' },
    { shape: 'diamond', position: 'top-40 left-20', delay: '1s', size: 'w-14 h-14', color: 'neon-pink' },
    { shape: 'hexagon', position: 'bottom-40 right-20', delay: '2s', size: 'w-16 h-16', color: 'crimson' },
    { shape: 'circle', position: 'bottom-20 right-10', delay: '1.5s', size: 'w-14 h-14', color: 'violet' },
    { shape: 'diamond', position: 'top-1/3 left-1/4', delay: '2.5s', size: 'w-12 h-12', color: 'neon-pink' },
    { shape: 'hexagon', position: 'bottom-1/3 left-1/3', delay: '3s', size: 'w-12 h-12', color: 'crimson' },
    { shape: 'circle', position: 'top-1/2 right-1/4', delay: '1.2s', size: 'w-10 h-10', color: 'violet' },
    { shape: 'diamond', position: 'top-2/3 left-1/5', delay: '2.2s', size: 'w-10 h-10', color: 'neon-pink' },
  ]

  const getShape = (shape, color) => {
    if (shape === 'circle') {
      const colorMap = {
        violet: 'bg-violet/20 border-violet/30',
        'neon-pink': 'bg-neon-pink/20 border-neon-pink/30',
        crimson: 'bg-crimson/20 border-crimson/30'
      }
      return <div className={`w-full h-full rounded-full ${colorMap[color] || colorMap.violet} border`} />
    } else if (shape === 'diamond') {
      const colorMap = {
        violet: 'bg-violet/20 border-violet/30',
        'neon-pink': 'bg-neon-pink/20 border-neon-pink/30',
        crimson: 'bg-crimson/20 border-crimson/30'
      }
      return <div className={`w-full h-full ${colorMap[color] || colorMap.violet} border`} style={{ transform: 'rotate(45deg)' }} />
    } else if (shape === 'hexagon') {
      const fillColor = color === 'violet' ? 'rgba(139, 92, 246, 0.2)' : color === 'neon-pink' ? 'rgba(255, 20, 147, 0.2)' : 'rgba(220, 38, 38, 0.2)'
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <polygon 
            points="50,5 90,25 90,75 50,95 10,75 10,25" 
            fill={fillColor}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        </svg>
      )
    }
  }

  const smallGlows = [
    { position: 'top-32 left-32', delay: '0.5s' },
    { position: 'top-64 left-64', delay: '1.5s' },
    { position: 'bottom-32 right-32', delay: '2.5s' },
    { position: 'bottom-64 right-64', delay: '3.5s' },
    { position: 'top-1/2 left-16', delay: '2s' },
    { position: 'bottom-1/2 right-16', delay: '1s' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-5 hidden lg:block">
      {/* Main floating elements - Geometric shapes */}
      {elements.map((element, idx) => (
        <div
          key={idx}
          className={`absolute ${element.position} animate-float`}
          style={{ animationDelay: element.delay, animationDuration: '10s' }}
        >
          <div className={`${element.size} flex items-center justify-center backdrop-blur-xl shadow-2xl hover:scale-110 transition-all opacity-30 hover:opacity-60 relative`}>
            {(() => {
              const glowColor = element.color === 'violet' ? 'rgba(139, 92, 246, 0.1)' : 
                                element.color === 'neon-pink' ? 'rgba(255, 20, 147, 0.1)' : 
                                'rgba(220, 38, 38, 0.1)'
              return <div className="absolute inset-0 blur-lg animate-pulse-slow" style={{ background: `radial-gradient(circle, ${glowColor}, transparent)` }} />
            })()}
            {getShape(element.shape, element.color)}
          </div>
        </div>
      ))}

      {/* Small glowing orbs - Darker and more subtle */}
      {smallGlows.map((glow, idx) => (
        <div
          key={`glow-${idx}`}
          className={`absolute ${glow.position} animate-pulse-slow`}
          style={{ animationDelay: glow.delay }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-violet/20 to-neon-pink/20 blur-md shadow-xl shadow-violet/30" />
        </div>
      ))}

      {/* Decorative lines/connections - Darker and more subtle */}
      <svg className="absolute inset-0 w-full h-full opacity-5" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 20, 147, 0.15)" />
            <stop offset="100%" stopColor="rgba(220, 38, 38, 0.15)" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="20%" x2="20%" y2="30%" stroke="url(#lineGradient)" strokeWidth="0.5" opacity="0.1" />
        <line x1="80%" y1="70%" x2="90%" y2="80%" stroke="url(#lineGradient)" strokeWidth="0.5" opacity="0.1" />
      </svg>
    </div>
  )
}

export default FloatingElements

