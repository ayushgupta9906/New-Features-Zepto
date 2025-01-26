import React, { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';

interface CoinAnimationProps {
  amount: number;
  onComplete: () => void;
}

export function CoinAnimation({ amount, onComplete }: CoinAnimationProps) {
  const [coins, setCoins] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Create coins for animation
    const newCoins = Array.from({ length: Math.min(amount, 5) }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50, // Random spread
      y: 0
    }));
    setCoins(newCoins);

    // Cleanup animation after it completes
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [amount, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: 'coin-float 1.5s ease-out forwards',
            animationDelay: `${coin.id * 0.1}s`,
            transform: `translate(calc(-50% + ${coin.x}px), -50%)`
          }}
        >
          <Coins className="h-8 w-8 text-yellow-500 animate-spin" />
        </div>
      ))}
      <style>{`
        @keyframes coin-float {
          0% {
            opacity: 0;
            transform: translate(calc(-50% + var(--x)), 100%);
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--x)), -100%);
          }
        }
      `}</style>
    </div>
  );
}