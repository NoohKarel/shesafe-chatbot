function QuickSuggestions({ onSelect }) {
  const suggestions = [
    { text: 'What should I do if I feel unsafe?', icon: '🛡️' },
    { text: 'How to file a harassment complaint?', icon: '📋' },
    { text: 'Emergency contacts', icon: '📞' },
    { text: 'Self-defense tips', icon: '👊' },
  ]

  return (
    <div className="px-4 md:px-6 py-4 space-y-2">
      <p className="text-xs text-white/50 mb-2 font-medium">💬 Quick suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(suggestion.text)}
            className="px-3 py-2 glass rounded-full text-xs text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-1.5 hover:scale-105 group"
          >
            <span className="text-sm group-hover:scale-110 transition-transform">{suggestion.icon}</span>
            <span>{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickSuggestions

