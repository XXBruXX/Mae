'use client';

import { useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { type Song } from '@/lib/memories';

interface GlobalAudioPlayerProps {
  song?: Song;
  isActive: boolean;
  volume?: number;
}

export const GlobalAudioPlayer = ({ 
  song, 
  isActive, 
  volume = 0.3 
}: GlobalAudioPlayerProps) => {
  const { play, pause, isPlaying, error } = useAudioPlayer({
    url: song?.audio_url,
    volume,
    loop: true
  });

  useEffect(() => {
    if (isActive && song?.audio_url && !isPlaying) {
      const playAudio = async () => {
        try {
          await play();
        } catch (err) {
          console.warn('Não foi possível reproduzir o áudio automaticamente:', err);
        }
      };
      
      // Delay para dar tempo da tela carregar
      const timer = setTimeout(playAudio, 1000);
      return () => clearTimeout(timer);
    } else if (!isActive && isPlaying) {
      pause();
    }
  }, [isActive, song?.audio_url, play, pause, isPlaying]);

  // Não renderiza nada visualmente - apenas gerencia o áudio
  return null;
};

export default GlobalAudioPlayer;