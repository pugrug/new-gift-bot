'use client';

import React, { useState } from 'react';

const GiftBot = () => {
  const [prompt, setPrompt] = useState('');
  const [isCoalMode, setIsCoalMode] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult(isCoalMode ? 
        "😈 A 'World's Okayest Person' trophy!" :
        "🎁 A custom playlist of their favorite songs!");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Star border */}
      <div className="text-center text-[var(--retro-gold)] text-2xl mb-8">
        <span className="sparkle">★</span> ⋆ 
        <span className="sparkle">★</span> ⋆ 
        <span className="sparkle">★</span> ⋆ 
        <span className="sparkle">★</span>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl text-[var(--retro-paper)] retro-text-shadow flex justify-center items-center gap-2">
          <span>🎁</span> 
          Gift Bot 
          <span>🎁</span>
        </h1>
        <div className="text-[var(--retro-paper)] text-xl mt-2">
          Your Radical Gift Advisor!
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full">
        <div className="retro-border bg-[var(--retro-paper)] p-6 rounded-lg animate-fadeIn">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-[var(--retro-dark-green)] text-xl">
                Who needs a gift? 🤔
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 bg-white border-2 border-[var(--retro-green)] rounded-lg"
                rows={3}
                placeholder="Tell me about this awesome person..."
              />
            </div>

            {/* Coal Mode Toggle */}
            <div className="flex items-center gap-3 p-3 bg-[var(--retro-paper)] rounded-lg 
                          border-2 border-dashed border-[var(--retro-green)]">
              <input
                type="checkbox"
                checked={isCoalMode}
                onChange={(e) => setIsCoalMode(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-[var(--retro-dark-green)] text-lg">
                Coal Mode 😈
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !prompt}
              className={`w-full p-3 rounded-lg text-xl
                       transition-all transform hover:scale-105
                       ${loading || !prompt 
                         ? 'bg-gray-200 text-gray-500'
                         : 'bg-[var(--retro-gold)] text-[var(--retro-dark-green)] animate-shine'
                       }`}
            >
              {loading ? '🎄 Making Magic...' : '✨ Get Gift Suggestion! ✨'}
            </button>
          </form>

          {/* Result Area */}
          {result && (
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-[var(--retro-green)] animate-fadeIn">
              <p className="text-xl text-[var(--retro-dark-green)]">
                {result}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[var(--retro-paper)] text-sm animate-border-blink">
            🚧 Always under construction! 🚧
          </p>
        </div>
      </div>
    </>
  );
};

export default GiftBot;