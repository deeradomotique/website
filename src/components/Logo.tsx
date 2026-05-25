import React from 'react';
import { Zap } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Zap className="w-8 h-8 text-deera-purple" />
        <Zap className="w-8 h-8 text-deera-purple absolute top-0 left-0 opacity-50 animate-pulse" />
      </div>
      <span className="text-deera-purple text-2xl font-bold">DEERA</span>
    </div>
  );
};

export default Logo;