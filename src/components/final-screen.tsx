'use client';

import { cn } from '@/lib/utils';
import { SparklesPreview } from './sparkles';
import { SparkleButton } from './ui/sparkle-button';
import { useEffect } from 'react';

interface FinalScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onNavigate: () => void;
}

const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {
    
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isVisible) {
      timeoutId = setTimeout(() => {
        onNavigate();
      }, 5000); 
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, onNavigate]);

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center text-center p-5 transition-all duration-800 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <SparklesPreview />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <p className="text-white/80 text-lg mb-4">Com a trilha sonora de:</p>
        <h2 className="font-headline text-4xl sm:text-5xl bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent mb-2 text-center">
          {songTitle || 'Uma música especial'}
        </h2>
        <p className="text-white/60 text-base">Página Inicial</p>
      </div>
    </div>
  );
};

export default FinalScreen;
