// Update your src/app/page.js file to include these changes
'use client'
import { useState } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

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
    <main className="min-h-screen p-8 bg-gradient-to-b from-red-100 to-green-100">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center" style={{ fontFamily: 'Comic Sans MS' }}>
          Gift Bot 🎁
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-lg">Who needs a gift?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Describe the person and occasion..."
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isCoalMode}
                onChange={(e) => setIsCoalMode(e.target.checked)}
                className="w-4 h-4"
                disabled={loading}
              />
              <span>Coal Mode 😈</span>
            </label>

            {process.env.NODE_ENV === 'development' && (
              <label className="flex items-center space-x-2 ml-4">
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

          <button
            type="submit"
            disabled={loading || !prompt}
            className={`w-full p-2 text-white rounded flex items-center justify-center space-x-2 ${
              loading || !prompt ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" className="mr-2" />
                <span>🎄 Thinking...</span>
              </>
            ) : (
              <span>🎁 Get Gift Suggestion</span>
            )}
          </button>
        </form>

        {loading ? (
          <div className="p-8 bg-white rounded shadow flex flex-col items-center space-y-4">
            <LoadingSpinner size="large" />
            <p className="text-lg text-gray-600">Santa's elves are brainstorming...</p>
          </div>
        ) : result && (
          <div className="p-4 bg-white rounded shadow">
            <p className="text-lg">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}