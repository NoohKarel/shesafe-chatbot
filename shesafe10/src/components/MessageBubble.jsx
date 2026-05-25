function MessageBubble({ message }) {
  const isUser = message.sender === 'user'

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in group`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 md:px-5 md:py-4 relative transition-all duration-300 hover:scale-[1.02] ${
          isUser
            ? 'message-user shadow-lg shadow-neon-pink/20 hover:shadow-xl hover:shadow-neon-pink/30'
            : 'message-bot glass shadow-lg hover:shadow-xl'
        }`}
      >
        {/* Subtle inner glow */}
        <div className={`absolute inset-0 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-violet/10 via-neon-pink/10 to-crimson/10' 
            : 'bg-white/5'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`} />

        {/* Avatar/Icon - Geometric shapes */}
        <div className={`absolute ${isUser ? '-right-2 top-2' : '-left-2 top-2'} w-7 h-7 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 opacity-0 group-hover:opacity-100 ${
          isUser 
            ? 'bg-gradient-to-br from-violet to-neon-pink ring-1 ring-neon-pink/40 rounded-full' 
            : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 ring-1 ring-violet/20 rounded-full'
        }`}>
          <div className={`w-3 h-3 rounded-full ${isUser ? 'bg-white/90' : 'bg-violet/60'}`} />
        </div>

        <p className="text-sm md:text-base leading-relaxed text-white whitespace-pre-wrap">
          {message.text}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-white/40">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {isUser && (
            <span className="text-xs text-white/30">✓✓</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble

