import React from 'react';

const RetroSnowfall = () => {
  // Generate multiple snowflakes spread across the screen initially
  const snowflakes = Array.from({ length: 50 }).map((_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`, // Distribute vertically too
    animationDuration: `${Math.random() * 10 + 5}s`,
    animationDelay: `-${Math.random() * 5}s`, // Negative delay for immediate start
    opacity: Math.random() * 0.7 + 0.3,
    size: Math.random() * 0.5 + 0.8 // Random size multiplier
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map(snowflake => (
        <div
          key={snowflake.id}
          className="absolute text-white"
          style={{
            left: snowflake.left,
            top: snowflake.top,
            animation: `fall ${snowflake.animationDuration} linear infinite`,
            animationDelay: snowflake.animationDelay,
            opacity: snowflake.opacity,
            transform: `scale(${snowflake.size})`
          }}
        >
          ❄
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RetroSnowfall;