'use client';

import { cn } from '@/lib/utils';
import { SparklesPreview } from './sparkles';
import { SparkleButton } from './ui/sparkle-button';
import { Music, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface FinalScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onNavigate: () => void;
}

const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {
  const handleClick = () => {
    setTimeout(() => {
      onNavigate();
    }, 900);
  };
  
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center text-center p-5 transition-all duration-800 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {songTitle && (
        <div className="now-playing-banner">
          <Music className="h-5 w-5 text-white/80" />
          <div className="song-info">
            <span className="playing-text">Tocando Agora:</span>
            <span className="song-title-banner truncate">{songTitle}</span>
          </div>
        </div>
      )}

      <SparklesPreview />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <div className="absolute top-28 sm:top-40 text-center">
          <span className="text-white/50 text-xs">Página Inicial</span>
        </div>
      </div>

      <div className="absolute bottom-28 md:bottom-20 text-center">
        <Button 
          onClick={onNavigate}
          className="bg-white/10 border-2 border-white/30 text-white rounded-full px-6 py-3 backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          Ver Álbum de Fotos <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FinalScreen;
