function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 px-4 md:px-8 py-3 glass border-b border-white/10 backdrop-blur-xl relative">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet to-neon-pink flex items-center justify-center shadow-lg shadow-violet/30">
            <div className="w-4 h-4 rounded-full bg-white/90" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-white/60">Safety Fact</p>
            <p className="text-sm font-semibold text-white">112 - Universal Emergency</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 glass rounded-full px-3 py-1.5 border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-xs text-white/70 font-medium">All systems operational</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <div className="w-3 h-3 rounded border border-white/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
            <span className="hidden sm:inline font-medium">Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar

