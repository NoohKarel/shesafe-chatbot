import { useState, useRef } from 'react'

function InputBar({ onSendMessage }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="px-4 md:px-6 py-4 md:py-5 border-t border-white/10 bg-gradient-to-r from-white/5 via-white/3 to-white/5 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-violet/5 via-transparent to-neon-pink/5 opacity-50" />
      <form onSubmit={handleSubmit} className="flex items-center gap-3 relative z-10">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet/20 via-neon-pink/20 to-crimson/20 rounded-xl md:rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="relative w-full px-4 py-3 md:px-5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet/50 focus:border-violet/50 transition-all duration-200 text-sm md:text-base hover:bg-white/8"
          />
          {input.length > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">
              {input.length}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-3 md:px-6 md:py-4 bg-gradient-to-r from-violet to-neon-pink rounded-xl md:rounded-2xl text-white font-semibold hover:shadow-lg hover:shadow-neon-pink/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base flex items-center justify-center min-w-[80px] md:min-w-[100px] relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Send</span>
            <span className="text-lg">➤</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </form>
    </div>
  )
}

export default InputBar

