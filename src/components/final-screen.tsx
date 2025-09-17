'use client';

import { cn } from '@/lib/utils';
import { Music } from 'lucide-react';
import { SparkleButton } from './ui/sparkle-button';

interface FinalScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onNavigate: () => void;
}

const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center p-5 transition-all duration-800 ease-out',
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

      {/* Container principal para centralizar o conteúdo */}
      <div className="flex-grow flex flex-col justify-center items-center text-center w-full max-w-2xl relative">
        <p className="text-white/80 text-lg leading-relaxed max-w-xl">
        </p>
      </div>

      <div className="absolute bottom-16 md:bottom-20 text-center">
        <SparkleButton onClick={onNavigate}>
          Ver Álbum de Fotos
        </SparkleButton>
      </div>
    </div>
  );
};

export default FinalScreen;
