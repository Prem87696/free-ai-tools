import React from 'react';

interface AdPlaceholderProps {
  slot: 'header' | 'sidebar' | 'content' | 'footer';
  className?: string;
}

export function AdPlaceholder({ slot, className }: AdPlaceholderProps) {
  const getDimensions = () => {
    switch (slot) {
      case 'header': return 'h-[90px] w-full max-w-[728px]';
      case 'sidebar': return 'h-[600px] w-full max-w-[300px]';
      case 'content': return 'h-[250px] w-full max-w-[300px] md:max-w-[728px]';
      case 'footer': return 'h-[90px] w-full max-w-[728px]';
      default: return 'h-[90px] w-full';
    }
  };

  return (
    <div className={`flex justify-center items-center my-6 ${className}`}>
      <div className={`bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm p-4 ${getDimensions()}`}>
        <span className="font-mono text-xs uppercase tracking-wider mb-2">Advertisement</span>
        <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs">Ads</span>
        </div>
        <span className="mt-2 text-xs text-center px-4">Google AdSense Placeholder ({slot})</span>
      </div>
    </div>
  );
}
