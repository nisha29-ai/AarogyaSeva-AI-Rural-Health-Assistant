import React from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'emerald' | 'amber' | 'red';
  onClick?: () => void;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  glowColor = 'emerald',
  onClick,
}) => {
  const glowClasses = {
    emerald: 'border-brand-500/30 hover:border-brand-400 shadow-brand-500/10 hover:shadow-brand-500/25',
    amber: 'border-amber-500/30 hover:border-amber-400 shadow-amber-500/10 hover:shadow-amber-500/25',
    red: 'border-red-500/30 hover:border-red-400 shadow-red-500/10 hover:shadow-red-500/25',
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card-floating rounded-3xl p-6 relative overflow-hidden group border ${glowClasses[glowColor]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Subtle floating ambient highlight glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-500/10 blur-2xl group-hover:bg-brand-500/20 transition-all duration-500" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
