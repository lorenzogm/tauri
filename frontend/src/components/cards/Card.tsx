import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';
import type { Card as CardType } from '../../types';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onPlay' | 'onSelect'> {
  card: CardType;
  isPlayable?: boolean;
  isSelected?: boolean;
  showCost?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onPlay?: (cardId: string) => void;
  onSelect?: (cardId: string) => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    card,
    isPlayable = true,
    isSelected = false,
    showCost = true,
    size = 'md',
    onPlay,
    onSelect,
    className,
    ...props
  }, ref) => {
    const rarityColors = {
      Common: 'border-gray-400 bg-gray-900',
      Uncommon: 'border-crypto-green-500 bg-crypto-green-900/20',
      Rare: 'border-crypto-purple-500 bg-crypto-purple-900/20',
      Epic: 'border-crypto-gold-500 bg-crypto-gold-900/20',
      Legendary: 'border-crypto-red-500 bg-crypto-red-900/20 shadow-neon',
    };

    const cardRarityClass = rarityColors[card.rarity] || rarityColors.Common;

    const cardTypeColors = {
      'Token': 'text-crypto-gold-400',
      'Joker': 'text-crypto-purple-400', 
      'Tool': 'text-crypto-green-400',
      'Trap': 'text-crypto-red-400',
      'Event': 'text-blue-400',
    };

    const sizes = {
      sm: 'w-24 h-36 text-xs',
      md: 'w-32 h-48 text-sm',
      lg: 'w-40 h-60 text-base',
    };

    const handleClick = () => {
      if (onSelect) {
        onSelect(card.id);
      } else if (onPlay && isPlayable) {
        onPlay(card.id);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border-2 p-3 cursor-pointer transition-all duration-200 hover:scale-105',
          sizes[size],
          cardRarityClass,
          isSelected && 'ring-2 ring-crypto-gold-500 scale-105',
          !isPlayable && 'opacity-50 cursor-not-allowed',
          isPlayable && 'hover:shadow-card-hover',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start mb-2">
          {showCost && card.cost && (
            <div className="bg-currency-crymp text-crypto-dark-900 text-xs font-bold px-1.5 py-0.5 rounded">
              {card.cost}
            </div>
          )}
          <div className={cn('text-xs font-medium', cardTypeColors[card.card_type])}>
            {card.card_type}
          </div>
        </div>

        {/* Card Name */}
        <h3 className="text-white font-bold text-center mb-2 leading-tight">
          {card.name}
        </h3>

        {/* Card Points */}
        {card.base_points && (
          <div className="text-currency-cw3 text-center text-lg font-bold mb-2">
            {card.base_points}
          </div>
        )}

        {/* Synergies */}
        {card.synergies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.synergies.map((synergy) => (
              <span
                key={synergy}
                className={cn(
                  'text-2xs px-1 py-0.5 rounded text-white font-medium',
                  `bg-synergy-${synergy.toLowerCase()}/20 border border-synergy-${synergy.toLowerCase()}`
                )}
              >
                {synergy}
              </span>
            ))}
          </div>
        )}

        {/* Effects */}
        {card.effects.length > 0 && (
          <div className="text-2xs text-gray-300 mb-2">
            {card.effects[0].description}
          </div>
        )}

        {/* Flavor Text */}
        {card.flavor_text && (
          <div className="text-2xs text-gray-400 italic text-center absolute bottom-2 left-2 right-2">
            {card.flavor_text}
          </div>
        )}

        {/* Rarity Indicator */}
        <div className="absolute top-1 right-1">
          <div className="w-2 h-2 rounded-full bg-current opacity-60" />
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
export type { CardProps };