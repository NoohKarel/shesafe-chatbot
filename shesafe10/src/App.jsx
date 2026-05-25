import { useState, useRef } from 'react'
import Chatbot from './components/Chatbot'
import EmergencyButton from './components/EmergencyButton'
import AnimatedBackground from './components/AnimatedBackground'
import SidePanel from './components/SidePanel'
import FloatingElements from './components/FloatingElements'
import TopBar from './components/TopBar'
import BackgroundPattern from './components/BackgroundPattern'

function App() {
  const sendMessageRef = useRef(null)

  const handleSidePanelAction = (message) => {
    if (sendMessageRef.current) {
      sendMessageRef.current(message)
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradient - Deeper black */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#000000] via-[#020202] to-[#000000] z-0" />
      
      {/* Background pattern */}
      <BackgroundPattern />
      
      {/* Animated gradient overlays - Darker and more intense */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet/5 rounded-full blur-3xl animate-pulse-slow opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl animate-pulse-slow opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/3 rounded-full blur-3xl animate-pulse-slow opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-violet/3 rounded-full blur-3xl animate-pulse-slow opacity-50" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-neon-pink/3 rounded-full blur-3xl animate-pulse-slow opacity-50" style={{ animationDelay: '4s' }} />
      </div>

      {/* Animated particle background */}
      <AnimatedBackground />

      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Top Bar */}
      <TopBar />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:pr-80 pt-20">
        <Chatbot onMessageSend={(handler) => { sendMessageRef.current = handler }} />
      </div>

      {/* Side Panel */}
      <SidePanel onActionClick={handleSidePanelAction} />

      {/* Emergency Button - Always visible */}
      <EmergencyButton />
    </div>
  )
}

export default App

