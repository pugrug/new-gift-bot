'use client'
import { useState } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import RetroSnowfall from '@/app/components/RetroSnowfall';

const MOCK_RESPONSES = {
  normal: [
    "🎁 A personalized star map of their birthday night sky - because they're stellar (even if they don't know it)!",
    "🎁 A custom phone case with their pet's face - because we know who they love more than you"
  ],
  coal: [
    "😈 A book called 'How to Be a Better Sibling' - with all the important parts highlighted",
    "😈 A wall calendar with 'Return Items' marked on every single day. Some people need daily reminders 🙄"
  ]
};

// Add blinking lights border animation
const BlinkingLights = () => (
  <div className="absolute inset-0 border-4 border-dashed animate-border-blink pointer-events-none" />
);

// Sparkle overlay component
const SparkleOverlay = () => (
  <div 
    className="absolute inset-0 opacity-50 pointer-events-none"
    style={{
      backgroundImage: `
        radial-gradient(circle at 25% 25%, #ffffff22 1%, transparent 1%),
        radial-gradient(circle at 75% 75%, #ffffff22 1%, transparent 1%),
        radial-gradient(circle at 50% 50%, #ffffff22 1%, transparent 1%)
      `,
      backgroundSize: '100px 100px',
      backgroundPosition: '0 0, 50px 50px, 25px 25px'
    }}
  />
);

export default function GiftBot() {
  const [useMockData, setUseMockData] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isCoalMode, setIsCoalMode] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(''); // Clear previous result
    
    if (useMockData) {
      // Use mock data during development
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      const responses = isCoalMode ? MOCK_RESPONSES.coal : MOCK_RESPONSES.normal;
      setResult(responses[Math.floor(Math.random() * responses.length)]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          isCoalMode,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setResult('🎅 Ho ho NO! Something went wrong!');
      } else {
        setResult(data.suggestion);
      }
    } catch (error) {
      setResult('🎅 Ho ho NO! Something went wrong!');
    }
    setLoading(false);
  }

  return (
    <main 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start pt-8"
      style={{
        background: `
          linear-gradient(
            135deg,
            #1a472a 0%,
            #2d5a3c 25%,
            #b71c1c 50%,
            #7f0000 75%,
            #1a472a 100%
          )
        `
      }}
    >
      <RetroSnowfall />
      <SparkleOverlay />
      
      {/* Title Section */}
      <div className="w-full max-w-2xl mx-auto mb-8 text-center">
        <h1 
          className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-500 to-yellow-300 animate-shine"
          style={{ 
            fontFamily: 'Comic Sans MS',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), -2px -2px 4px rgba(255, 255, 255, 0.5), 0 0 8px rgba(255, 215, 0, 0.5)',
            filter: 'drop-shadow(0 0 2px #fff)'
          }}
        >
          Gift Bot 🎁
        </h1>
        <div 
          className="text-3xl animate-pulse mt-4" 
          style={{ 
            fontFamily: 'Comic Sans MS',
            color: '#ffd700',
            textShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
          }}
        >
          Ho! Ho! Ho!
        </div>
      </div>
      
      {/* Main Interface Section */}
      <div className="w-full max-w-2xl mx-auto px-4 relative">
        <form onSubmit={handleSubmit} className="space-y-6 relative p-8">
          <BlinkingLights />
          <div className="space-y-4 bg-white/90 p-6 rounded-xl shadow-2xl backdrop-blur relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-green-50 to-red-50 opacity-50 rounded-xl" />
            <label 
              className="block text-2xl font-bold text-red-700 relative text-center mb-4" 
              style={{ fontFamily: 'Comic Sans MS' }}
            >
              Who needs a gift? 🎄
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 border-3 border-red-500 rounded-lg relative bg-white/90 text-lg"
              placeholder="Describe the person and occasion..."
              rows={4}
              disabled={loading}
              style={{ fontFamily: 'Comic Sans MS' }}
            />

            <div className="flex items-center justify-center space-x-4 pt-4">
              <label className="flex items-center space-x-2 relative">
                <input
                  type="checkbox"
                  checked={isCoalMode}
                  onChange={(e) => setIsCoalMode(e.target.checked)}
                  className="w-5 h-5 text-red-600"
                  disabled={loading}
                />
                <span className="text-xl text-red-700 font-bold" style={{ fontFamily: 'Comic Sans MS' }}>
                  Coal Mode 😈
                </span>
              </label>

              {process.env.NODE_ENV === 'development' && (
                <label className="flex items-center space-x-2 ml-4 relative">
                  <input
                    type="checkbox"
                    checked={useMockData}
                    onChange={(e) => setUseMockData(e.target.checked)}
                    className="w-4 h-4"
                    disabled={loading}
                  />
                  <span className="text-sm text-gray-600">Use Mock Data</span>
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !prompt}
            className={`w-full p-5 text-white rounded-xl shadow-2xl relative overflow-hidden transform hover:scale-105 transition-transform ${
              loading || !prompt ? 'bg-gray-400' : 'bg-gradient-to-r from-red-600 via-green-600 to-red-600'
            }`}
            style={{ 
              fontFamily: 'Comic Sans MS',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            <div className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <LoadingSpinner size="small" className="mr-2" />
                  <span className="text-2xl">🎄 Thinking...</span>
                </>
              ) : (
                <span className="text-2xl">🎁 Get Gift Suggestion</span>
              )}
            </div>
          </button>
        </form>

        {/* Result Section */}
        {loading ? (
          <div className="p-8 bg-white/90 rounded-xl shadow-2xl backdrop-blur text-center relative mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-green-50 to-red-50 opacity-50 rounded-xl" />
            <BlinkingLights />
            <LoadingSpinner size="large" />
            <p className="text-xl text-red-700 mt-4 relative" style={{ fontFamily: 'Comic Sans MS' }}>
              Santa's elves are brainstorming...
            </p>
          </div>
        ) : result && (
          <div className="p-8 bg-white/90 rounded-xl shadow-2xl backdrop-blur relative mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-green-50 to-red-50 opacity-50 rounded-xl" />
            <BlinkingLights />
            <p className="text-xl text-red-700 relative" style={{ fontFamily: 'Comic Sans MS' }}>
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}