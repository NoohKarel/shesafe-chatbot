// Chatbot service to connect with Python backend
// Set USE_API to true and start the Flask API server to use the real chatbot
const USE_API = true // Set to true to use Python backend API
const API_URL = 'http://localhost:5000/api/chat'

const MOCK_RESPONSES = {
  'hello': "Hello! I'm here to help you with any safety concerns. How can I assist you today?",
  'help': "I'm here to support you. For immediate assistance, please call:\n• Emergency: 112\n• Women Helpline: 181\n\nWhat specific help do you need?",
  'harassment': "Harassment is a serious issue. Here's what you can do:\n\n1. Document everything (dates, times, locations, witnesses)\n2. Report to police (file an FIR)\n3. Contact Women Helpline: 181\n4. Seek support from family/friends\n5. Consider legal action under IPC Section 354A\n\nFor immediate help, call 112 or 181.",
  'default': "I understand you need help. For immediate assistance, please call:\n• Emergency: 112\n• Women Helpline: 181\n\nYou can ask me about:\n• Harassment & assault\n• Domestic violence\n• Legal rights & filing FIR\n• Workplace safety (POSH Act)\n• Cyber crimes & online fraud\n• Travel safety\n• Self-defense tips\n• Mental health support\n\nPlease ask me a specific question and I'll provide detailed information!"
}

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function getChatbotResponse(userInput) {
  // Use Python backend API if enabled
  if (USE_API) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      })
      
      if (!response.ok) {
        throw new Error('API request failed')
      }
      
      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('API error:', error)
      // Fallback to mock response if API fails
      return "I'm having trouble connecting right now. For immediate help, please call 112 (Emergency) or 181 (Women Helpline)."
    }
  }

  // Mock implementation (fallback)
  await delay(800 + Math.random() * 500)

  const input = userInput.toLowerCase().trim()

  // Check for emergency keywords
  const emergencyKeywords = [
    'emergency', 'help now', 'danger', 'attack', 'being followed',
    'unsafe', 'immediate help', 'urgent', 'need emergency help'
  ]
  
  if (emergencyKeywords.some(keyword => input.includes(keyword))) {
    return "🚨 EMERGENCY DETECTED! 🚨\n\nPlease call immediately:\n• 112 - Emergency Services\n• 181 - Women Helpline\n• 100 - Police\n\nStay safe and seek help from nearby authorities or trusted people. You are not alone."
  }

  // Check for helpline numbers
  if (input.includes('helpline') || input.includes('helpline numbers') || input.includes('emergency helpline')) {
    return "📞 Emergency Helpline Numbers:\n\n• 112 - Emergency Services (All India)\n• 181 - Women Helpline (24/7)\n• 100 - Police Emergency\n• 1091 - Women in Distress\n• 1098 - Child Helpline\n\nSave these numbers in your phone for quick access. These services are available 24/7."
  }

  // Check for legal help/complaint
  if (input.includes('legal') || input.includes('complaint') || input.includes('file') || input.includes('fir')) {
    return "📋 Legal Help & Filing Complaints:\n\n1. **Filing an FIR (First Information Report):**\n   - Go to nearest police station\n   - You have the right to file an FIR\n   - Get a copy of the FIR (it's your right)\n   - If refused, contact higher authorities\n\n2. **Legal Rights:**\n   - IPC Section 354A: Sexual harassment\n   - IPC Section 509: Insulting modesty\n   - POSH Act: Workplace harassment\n\n3. **Support:**\n   - Contact Women's Commission\n   - Legal aid services\n   - NGOs specializing in women's rights\n\nFor immediate help, call 112 or 181."
  }

  // Check for support/emotional support
  if (input.includes('support') || input.includes('emotional') || input.includes('guidance')) {
    return "💜 Emotional Support & Guidance:\n\nI'm here for you. Remember:\n\n• You are not alone\n• Your feelings are valid\n• Seeking help is a sign of strength\n• There are people who care\n\n**Support Resources:**\n• Women Helpline: 181\n• Mental Health Helpline: 1800-599-0019\n• Local support groups\n• Trusted friends and family\n\nTake care of yourself. You matter. 💜"
  }

  // Check for specific topics
  if (input.includes('hello') || input.includes('hi')) {
    return MOCK_RESPONSES.hello
  }
  
  if (input.includes('harassment') || input.includes('harassed')) {
    return MOCK_RESPONSES.harassment
  }

  if (input.includes('help')) {
    return MOCK_RESPONSES.help
  }

  // Default response
  return MOCK_RESPONSES.default
}

