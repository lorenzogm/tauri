import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils';
import { useTranslation } from '../../context';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  neonColor?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    neonColor,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const { t } = useTranslation();
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-crypto-dark-900 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-crypto-gold-600 hover:bg-crypto-gold-500 text-white focus:ring-crypto-gold-500 shadow-lg hover:shadow-xl',
      secondary: 'bg-crypto-dark-700 hover:bg-crypto-dark-600 text-crypto-gold-400 border border-crypto-gold-600 focus:ring-crypto-gold-500',
      danger: 'bg-crypto-red-600 hover:bg-crypto-red-500 text-white focus:ring-crypto-red-500 shadow-lg hover:shadow-xl',
      success: 'bg-crypto-green-600 hover:bg-crypto-green-500 text-white focus:ring-crypto-green-500 shadow-lg hover:shadow-xl',
      warning: 'bg-yellow-600 hover:bg-yellow-500 text-white focus:ring-yellow-500 shadow-lg hover:shadow-xl',
      neon: `bg-transparent border-2 text-current hover:bg-current hover:text-crypto-dark-900 focus:ring-current transition-all duration-300 ${neonColor ? `border-${neonColor} text-${neonColor}` : 'border-crypto-purple-500 text-crypto-purple-500'} shadow-neon hover:shadow-neon-lg`,
    };
    
    const sizes = {
      xs: 'px-2.5 py-1.5 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {isLoading ? t.common.loading : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };