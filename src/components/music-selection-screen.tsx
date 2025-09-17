'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowLeft, Plus, Music } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Song, type NewSong, getSongs, addSong } from '@/lib/memories';

interface MusicSelectionScreenProps {
  isVisible: boolean;
  onShowWelcome: () => void;
  onChoose: (songTitle?: string) => void;
}

const MusicSelectionScreen = ({ isVisible, onShowWelcome, onChoose }: MusicSelectionScreenProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const fetchSongs = async () => {
        setLoading(true);
        const fetchedSongs = await getSongs();
        setSongs(fetchedSongs);
        setLoading(false);
      };
      fetchSongs();
    }
  }, [isVisible]);

  const handleSelectSong = (songId: string) => {
    setSelectedSong(songId === selectedSong ? null : songId);
  };

  const handleChoose = () => {
    const song = songs.find(s => s.id === selectedSong);
    onChoose(song?.title);
  };
  
  const handleAddSong = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const artist = formData.get('artist') as string;
    const icon = formData.get('icon') as string;

    if (title && artist && icon && songs.length < 3) {
      const newSong: NewSong = {
        title,
        artist,
        icon,
      };
      const newId = await addSong(newSong);
      if (newId) {
        setSongs(prevSongs => [...prevSongs, { id: newId, ...newSong }]);
      }
      setOpen(false);
    }
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center transition-all duration-800 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <Button
        variant="ghost"
        onClick={onShowWelcome}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white/10 border-2 border-white/30 text-white rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <h2 className="font-headline text-3xl sm:text-4xl bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-8 text-center px-4">
        Primeiro, escolha uma música
      </h2>

      <div className="w-full max-w-sm px-4">
        <div className="main">
          <div className="currentplaying">
            <Music className="h-8 w-8 text-primary" />
            <p className="heading">Music Player</p>
          </div>
          {loading ? (
             <div className="text-center p-4">Carregando músicas...</div>
          ) : songs.length > 0 ? (
            songs.map(song => (
              <div key={song.id} className="loader" onClick={() => handleSelectSong(song.id)}>
                <div className="play-icon-container">
                  {selectedSong === song.id ? (
                    <div className="loading">
                      <div className="load"></div>
                      <div className="load"></div>
                      <div className="load"></div>
                    </div>
                  ) : (
                    <div className="play"></div>
                  )}
                </div>
                <div className="albumcover text-2xl flex items-center justify-center">{song.icon}</div>
                <div className="song">
                  <p className="name truncate">{song.title}</p>
                  <p className="artist">{song.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-muted-foreground">Nenhuma música adicionada.</div>
          )}
            {songs.length < 3 && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Música
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Música</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes da música. O limite é de 3 músicas.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddSong}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Nome
                      </Label>
                      <Input id="title" name="title" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="artist" className="text-right">
                        Artista
                      </Label>
                      <Input id="artist" name="artist" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="icon" className="text-right">
                        Ícone
                      </Label>
                      <Input id="icon" name="icon" placeholder="🎵" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="file" className="text-right">
                        Arquivo
                      </Label>
                      <Input id="file" type="file" className="col-span-3" accept=".mp3,.mp4" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <Button
        className="mt-8 bg-white/90 text-black font-bold hover:bg-white"
        disabled={!selectedSong && songs.length > 0}
        onClick={handleChoose}
      >
        {songs.length > 0 ? 'Escolher' : 'Pular'}
      </Button>

    </div>
  );
};

export default MusicSelectionScreen;
