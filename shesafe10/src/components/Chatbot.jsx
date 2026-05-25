import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import InputBar from './InputBar'
import QuickSuggestions from './QuickSuggestions'
import { getChatbotResponse } from '../services/chatbotService'

function Chatbot({ onMessageSend }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi, I'm SheSafe. I'm here to support you. Ask me anything related to your safety.",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    setShowSuggestions(false)

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Get bot response
    try {
      const response = await getChatbotResponse(text)
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now. For immediate help, please call 112 (Emergency) or 181 (Women Helpline).",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Expose handleSendMessage to parent via callback
  useEffect(() => {
    if (onMessageSend) {
      onMessageSend(handleSendMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Glassmorphism Chat Container */}
      <div 
        ref={chatContainerRef}
        className="glass-strong rounded-2xl md:rounded-3xl overflow-hidden shadow-glass border border-white/20 relative"
      >
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet/20 via-neon-pink/20 to-crimson/20 rounded-2xl md:rounded-3xl blur-xl opacity-50 -z-10 animate-pulse-slow" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet/10 via-transparent to-neon-pink/10 rounded-2xl md:rounded-3xl blur-lg opacity-30 -z-10" />
        {/* Header */}
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-white/10 relative overflow-hidden bg-gradient-to-r from-white/5 to-transparent">
          <div className="absolute inset-0 shimmer opacity-30" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-violet via-neon-pink to-crimson flex items-center justify-center animate-float shadow-2xl shadow-violet/30 ring-1 ring-white/10 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/50 to-neon-pink/50 blur-md opacity-50" />
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-violet to-neon-pink relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                  SheSafe
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
                    <span className="text-xs font-normal text-white/60">Online</span>
                  </span>
                </h1>
                <p className="text-sm md:text-base text-white/60 font-medium">
                  Women Safety Assistant
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="glass rounded-full px-3 py-1.5 text-xs text-white/80 flex items-center gap-1.5">
                <span>⚡</span>
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-[60vh] md:h-[65vh] overflow-y-auto px-4 md:px-6 py-6 space-y-4 relative">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent pointer-events-none z-0" />
          
          <div className="relative z-10">
            {messages.length === 1 && showSuggestions && (
              <QuickSuggestions onSelect={handleSendMessage} />
            )}
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <InputBar onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default Chatbot

