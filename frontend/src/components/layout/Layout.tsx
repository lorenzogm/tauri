import type { ReactNode } from 'react';
import { cn } from '../../utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn(
      'min-h-screen bg-gradient-dark text-white',
      'bg-crypto-dark-900',
      className
    )}>
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-crypto-purple-900/10 via-transparent to-crypto-gold-900/10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-crypto-purple-800/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function Header({ title, subtitle, children, className }: HeaderProps) {
  return (
    <header className={cn(
      'bg-crypto-dark-800/80 backdrop-blur-sm border-b border-crypto-dark-600',
      'sticky top-0 z-50',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display bg-gradient-crypto bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          {children && (
            <div className="flex items-center space-x-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main className={cn(
      'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
      className
    )}>
      {children}
    </main>
  );
}