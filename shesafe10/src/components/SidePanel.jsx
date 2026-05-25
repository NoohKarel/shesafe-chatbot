import { useState } from 'react'

function SidePanel({ onActionClick }) {
  const [isExpanded, setIsExpanded] = useState(true)

  const quickActions = [
    { 
      symbol: '!', 
      label: 'Emergency', 
      color: 'from-crimson to-red-600',
      message: 'I need emergency help right now'
    },
    { 
      symbol: 'H', 
      label: 'Helpline', 
      color: 'from-violet to-purple-600',
      message: 'What are the emergency helpline numbers?'
    },
    { 
      symbol: 'L', 
      label: 'Legal Help', 
      color: 'from-neon-pink to-pink-600',
      message: 'How do I file a legal complaint for harassment?'
    },
    { 
      symbol: 'S', 
      label: 'Support', 
      color: 'from-violet to-neon-pink',
      message: 'I need emotional support and guidance'
    },
  ]

  const handleActionClick = (message) => {
    if (onActionClick) {
      onActionClick(message)
    }
  }

  const stats = [
    { label: 'Emergency Helpline', value: '112', symbol: '•' },
    { label: 'Women Helpline', value: '181', symbol: '•' },
    { label: 'Police Emergency', value: '100', symbol: '•' },
  ]

  return (
    <div className={`hidden lg:block fixed right-8 top-[40%] -translate-y-1/2 z-20 transition-all duration-500 ${isExpanded ? 'w-72' : 'w-16'}`}>
      <div className="glass-strong rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-violet/30 via-neon-pink/20 to-crimson/20 rounded-2xl blur-xl opacity-40 -z-10 animate-pulse-slow" />
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-violet to-neon-pink rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        >
          {isExpanded ? '→' : '←'}
        </button>

        {isExpanded && (
          <div className="space-y-6 animate-fade-in">
            {/* Emergency Contacts Section */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-violet to-neon-pink rounded-full" />
                <span>Emergency Contacts</span>
              </h3>
              <div className="space-y-2">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="glass rounded-lg p-3 flex items-center justify-between hover:bg-white/5 transition-all group border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet to-neon-pink" />
                      <span className="text-xs text-white/70 font-medium">{stat.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-violet to-neon-pink rounded-full" />
                <span>Quick Actions</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleActionClick(action.message)}
                    className={`bg-gradient-to-br ${action.color} rounded-lg p-3 flex flex-col items-center gap-1.5 hover:scale-105 transition-all shadow-xl hover:shadow-2xl group active:scale-95 border border-white/10`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <span className="text-sm font-bold text-white group-hover:scale-110 transition-transform">{action.symbol}</span>
                    </div>
                    <span className="text-xs font-semibold text-white">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="glass rounded-lg p-4 border border-violet/20 bg-gradient-to-br from-violet/5 to-transparent">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-violet to-neon-pink rounded-full" />
                <span>Safety Tip</span>
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Always share your location with trusted contacts when traveling alone.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidePanel

