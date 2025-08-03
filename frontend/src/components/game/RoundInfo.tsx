import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';
import type { RoundType } from '../../types';
import { useTranslation } from '../../context';

interface RoundInfoProps extends HTMLAttributes<HTMLDivElement> {
  roundNumber: number;
  roundType: RoundType;
  target: number;
  current: number;
}

export function RoundInfo({
  roundNumber,
  roundType,
  target,
  current,
  className,
  ...props
}: RoundInfoProps) {
  const { t } = useTranslation();
  
  const roundTypeConfig = {
    'SmallBlind': {
      label: t.game.rounds.types.SmallBlind,
      color: 'text-crypto-green-400',
      bgColor: 'bg-crypto-green-900/20',
      borderColor: 'border-crypto-green-500',
    },
    'BigBlind': {
      label: t.game.rounds.types.BigBlind,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20', 
      borderColor: 'border-yellow-500',
    },
    'Boss': {
      label: t.game.rounds.types.Boss,
      color: 'text-crypto-red-400',
      bgColor: 'bg-crypto-red-900/20',
      borderColor: 'border-crypto-red-500',
    },
  };

  const config = roundTypeConfig[roundType];
  const progress = Math.min((current / target) * 100, 100);
  const isPassed = current >= target;

  return (
    <div
      className={cn(
        'bg-crypto-dark-800 border rounded-lg p-4',
        config.borderColor,
        config.bgColor,
        className
      )}
      {...props}
    >
      {/* Round Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            {t.game.rounds.round} {roundNumber}
          </h3>
          <div className={cn('text-sm font-medium', config.color)}>
            {config.label}
          </div>
        </div>
        
        {roundType === 'Boss' && (
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-crypto-red-500 rounded-full shadow-neon-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">💀</span>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{t.game.rounds.scoreProgress}</span>
          <span className={cn(
            'font-bold',
            isPassed ? 'text-crypto-green-400' : 'text-gray-300'
          )}>
            {current.toLocaleString()} / {target.toLocaleString()}
          </span>
        </div>
        
        <div className="w-full bg-crypto-dark-700 rounded-full h-3 overflow-hidden">
          <div
            className={cn(
              'h-3 rounded-full transition-all duration-500',
              isPassed 
                ? 'bg-crypto-green-500 shadow-neon' 
                : 'bg-gradient-to-r from-crypto-gold-600 to-crypto-green-500'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-400">
          <span>{Math.round(progress)}% {t.game.rounds.complete}</span>
          {isPassed && (
            <span className="text-crypto-green-400 font-bold">✓ {t.game.rounds.passed}</span>
          )}
        </div>
      </div>

      {/* Boss Warning */}
      {roundType === 'Boss' && (
        <div className="mt-3 p-2 bg-crypto-red-900/30 border border-crypto-red-600 rounded text-crypto-red-300 text-xs">
          ⚠️ {t.game.rounds.bossWarning}
        </div>
      )}
    </div>
  );
}