'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowLeft, Music4, PlayCircle, Square } from 'lucide-react';

interface MusicSelectionScreenProps {
  isVisible: boolean;
  onShowMemories: () => void;
}

const songs = [
  { id: '1', title: 'Como é grande o meu amor por você', artist: 'Roberto Carlos' },
  { id: '2', title: 'Trem-Bala', artist: 'Ana Vilela' },
  { id: '3', title: 'La Vie en Rose', artist: 'Édith Piaf' },
  { id: '4', title: 'My Way', artist: 'Frank Sinatra' },
];

const MusicSelectionScreen = ({ isVisible, onShowMemories }: MusicSelectionScreenProps) => {
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const handleSelectSong = (songId: string) => {
    setSelectedSong(songId === selectedSong ? null : songId);
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center transition-all duration-800 ease-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      )}
    >
      <Button
        variant="ghost"
        onClick={onShowMemories}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white/10 border-2 border-white/30 text-white rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <h2 className="font-headline text-4xl sm:text-5xl bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent mb-8 text-center px-4">
        Escolha uma Música de Fundo
      </h2>

      <div className="w-full max-w-md px-4">
        <div className="bg-card/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          {songs.map((song) => (
            <div
              key={song.id}
              className={cn(
                'flex items-center justify-between p-3 my-2 rounded-md cursor-pointer transition-all duration-300',
                selectedSong === song.id ? 'bg-accent/30' : 'hover:bg-white/10'
              )}
              onClick={() => handleSelectSong(song.id)}
            >
              <div className="flex items-center">
                <Music4 className="h-6 w-6 mr-4 text-accent" />
                <div>
                  <p className="font-bold text-lg text-primary">{song.title}</p>
                  <p className="text-sm text-primary/70">{song.artist}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-primary hover:text-accent">
                {selectedSong === song.id ? (
                   <Square className="h-6 w-6" />
                ) : (
                  <PlayCircle className="h-6 w-6" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <Button
        className="mt-8 bg-white/90 text-black font-bold hover:bg-white"
        disabled={!selectedSong}
        onClick={() => alert(`Música selecionada: ${songs.find(s => s.id === selectedSong)?.title}`)}
      >
        Finalizar
      </Button>

    </div>
  );
};

export default MusicSelectionScreen;
