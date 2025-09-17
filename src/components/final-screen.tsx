'use client';

import { cn } from '@/lib/utils';
import { Music, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface FinalScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onNavigate: () => void;
}

const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center p-5 transition-all duration-800 ease-out',
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
      <div className="flex-grow flex flex-col justify-center items-center text-center w-full max-w-2xl pt-16">
        <div>
          <h1 className="text-8xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif", lineHeight: '1' }}>
            MAE
          </h1>
          <h2 className="text-xs font-bold text-white tracking-widest uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Feliz Aniversário
          </h2>
        </div>

        <p className="text-white/80 text-lg leading-relaxed max-w-xl mt-4">
          Hoje é um dia especial, e celebramos não apenas seu aniversário, mas a pessoa incrível que você é. Sua força, amor e carinho são a luz que guia nossa família. Que este novo ciclo traga ainda mais felicidade, saúde e momentos inesquecíveis. Nós te amamos infinitamente.
        </p>
      </div>

      <div className="absolute bottom-16 md:bottom-20 text-center">
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
