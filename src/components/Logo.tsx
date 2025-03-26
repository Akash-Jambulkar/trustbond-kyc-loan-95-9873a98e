
import React from 'react';

interface LogoProps {
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ dark = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`font-bold ${sizeClasses[size]} ${dark ? 'text-primary' : 'text-white'}`}>
        TrustBond<span className="text-emerald-300">.</span>
      </div>
    </div>
  );
};

export default Logo;
