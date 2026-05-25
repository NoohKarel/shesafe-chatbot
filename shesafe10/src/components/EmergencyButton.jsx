import { useState } from 'react'

function EmergencyButton() {
  const [showAlert, setShowAlert] = useState(false)

  const handleEmergencyClick = () => {
    setShowAlert(true)
    // In a real app, this would trigger emergency protocols
    // For now, we'll show an alert and provide helpline numbers
    
    // Auto-hide after 5 seconds
    setTimeout(() => setShowAlert(false), 5000)
  }

  return (
    <>
      {/* Emergency Button - Fixed position */}
      <button
        onClick={handleEmergencyClick}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 px-6 py-4 md:px-8 md:py-5 bg-crimson hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-crimson/50 hover:shadow-xl hover:shadow-crimson/70 transition-all duration-200 animate-pulse-glow text-sm md:text-base flex items-center gap-2 md:gap-3 group relative overflow-hidden"
        aria-label="Emergency Help"
      >
        {/* Multiple glow layers */}
        <div className="absolute -inset-2 bg-crimson/30 rounded-2xl blur-xl animate-pulse-slow opacity-50" />
        <div className="absolute -inset-1 bg-crimson/20 rounded-2xl blur-lg opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-crimson via-red-600 to-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-crimson" />
        </div>
        <span className="relative z-10 font-bold tracking-wider">EMERGENCY</span>
        <div className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-crimson/50 animate-ping opacity-20" />
      </button>

      {/* Emergency Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-3xl p-6 md:p-8 max-w-md w-full border-2 border-crimson/50 shadow-glow-crimson">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-crimson to-red-700 flex items-center justify-center mb-4 mx-auto shadow-2xl shadow-crimson/50">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-crimson animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Emergency Assistance
              </h2>
              <p className="text-white/80 mb-6 text-sm md:text-base">
                For immediate help, contact:
              </p>
              <div className="space-y-3 mb-6">
                <a
                  href="tel:112"
                  className="block px-6 py-4 bg-crimson hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 text-lg md:text-xl"
                >
                  Call 112 (Emergency)
                </a>
                <a
                  href="tel:181"
                  className="block px-6 py-4 bg-violet hover:bg-violet-700 text-white font-bold rounded-xl transition-all duration-200 text-lg md:text-xl"
                >
                  Call 181 (Women Helpline)
                </a>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="px-6 py-3 text-white/60 hover:text-white transition-colors text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EmergencyButton

