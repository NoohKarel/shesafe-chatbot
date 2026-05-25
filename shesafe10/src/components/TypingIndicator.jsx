function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet/40 to-neon-pink/40 flex items-center justify-center animate-float shadow-lg shadow-violet/20">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet to-neon-pink" />
      </div>
      <div className="message-bot glass rounded-2xl px-5 py-4 shadow-lg">
        <div className="flex space-x-2 items-center">
          <div className="typing-dot w-2 h-2 bg-violet/80 rounded-full" />
          <div className="typing-dot w-2 h-2 bg-neon-pink/80 rounded-full" />
          <div className="typing-dot w-2 h-2 bg-crimson/80 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator

