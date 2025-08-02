import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';

interface ScoreDisplayProps extends HTMLAttributes<HTMLDivElement> {
  cw3Points: number;
  crympCurrency: number;
  target?: number;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreDisplay({
  cw3Points,
  crympCurrency,
  target,
  showProgress = false,
  size = 'md',
  className,
  ...props
}: ScoreDisplayProps) {
  const progressPercentage = target ? Math.min((cw3Points / target) * 100, 100) : 0;

  const sizes = {
    sm: 'text-sm p-3',
    md: 'text-base p-4',
    lg: 'text-lg p-6',
  };

  return (
    <div
      className={cn(
        'bg-crypto-dark-800 border border-crypto-dark-600 rounded-lg',
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Main Scores */}
      <div className="flex justify-between items-center mb-3">
        {/* CW3 Points */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-currency-cw3 rounded-full shadow-neon" />
          <span className="text-currency-cw3 font-bold">
            {cw3Points.toLocaleString()} $CW3
          </span>
        </div>

        {/* CRYMP Currency */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-currency-crymp rounded-full shadow-neon" />
          <span className="text-currency-crymp font-bold">
            {crympCurrency.toLocaleString()} $CRYMP
          </span>
        </div>
      </div>

      {/* Target Progress */}
      {showProgress && target && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progress to target</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-crypto-dark-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-crypto-gold-600 to-crypto-green-500 h-2 rounded-full transition-all duration-500 shadow-neon"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-400">
            Target: {target.toLocaleString()} $CW3
          </div>
        </div>
      )}
    </div>
  );
}