'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowLeft, Plus, Music, Play, Pause, Volume2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { type Song, type NewSong, getSongs, addSong } from '@/lib/memories';

interface MusicSelectionScreenProps {
  isVisible: boolean;
  onShowWelcome: () => void;
  onChoose: (songTitle?: string) => void;
}

const MusicSelectionScreen = ({ isVisible, onShowWelcome, onChoose }: MusicSelectionScreenProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [previewSong, setPreviewSong] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Áudio player para preview
  const currentSong = songs.find(s => s.id === previewSong);
  const { isPlaying, play, pause, error } = useAudioPlayer({ 
    url: currentSong?.audio_url,
    volume: 0.5,
    loop: false
  });

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
  
  const handlePreviewSong = async (songId: string) => {
    const song = songs.find(s => s.id === songId);
    
    if (!song?.audio_url) {
      toast({
        variant: "destructive",
        title: "Sem Áudio",
        description: "Esta música não possui arquivo de áudio.",
      });
      return;
    }
    
    if (previewSong === songId && isPlaying) {
      pause();
      setPreviewSong(null);
    } else {
      setPreviewSong(songId);
      // O hook useAudioPlayer vai automaticamente tocar quando o URL mudar
    }
  };
  
  // Auto-play quando previewSong muda
  useEffect(() => {
    if (previewSong && currentSong?.audio_url) {
      play();
    }
  }, [previewSong, currentSong, play]);
  
  // Limpar áudio ao sair da tela
  useEffect(() => {
    if (!isVisible) {
      pause();
      setPreviewSong(null);
    }
  }, [isVisible, pause]);

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
    const audioFile = formData.get('audio-file') as File;

    if (title && artist && icon && songs.length < 3) {
      let audioUrl = '';
      
      // Se um arquivo foi selecionado, converter para URL
      if (audioFile && audioFile.size > 0) {
        audioUrl = URL.createObjectURL(audioFile);
      }
      
      const newSong: NewSong = {
        title,
        artist,
        icon,
        audio_url: audioUrl
      };
      
      const newId = await addSong(newSong);
      if (newId) {
        setSongs(prevSongs => [...prevSongs, { id: newId, ...newSong }]);
        toast({
          title: "Música Adicionada!",
          description: `"${title}" foi adicionada à lista.`,
        });
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
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="currentplaying">
            <Music className="h-8 w-8 text-primary" />
            <p className="heading">Music Player</p>
          </div>
          {loading ? (
             <div className="text-center p-4">Carregando músicas...</div>
          ) : songs.length > 0 ? (
            songs.map(song => (
              <div key={song.id} className="loader">
                <div className="play-icon-container">
                  {previewSong === song.id && isPlaying ? (
                    <Pause 
                      className="h-5 w-5 text-primary cursor-pointer" 
                      onClick={() => handlePreviewSong(song.id)}
                    />
                  ) : (
                    <Play 
                      className="h-5 w-5 text-primary cursor-pointer" 
                      onClick={() => handlePreviewSong(song.id)}
                    />
                  )}
                </div>
                <div 
                  className="albumcover text-2xl flex items-center justify-center cursor-pointer" 
                  onClick={() => handleSelectSong(song.id)}
                >
                  {song.icon}
                  {selectedSong === song.id && (
                    <div className="absolute inset-0 bg-primary/20 rounded-md flex items-center justify-center">
                      <Volume2 className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
                <div className="song cursor-pointer" onClick={() => handleSelectSong(song.id)}>
                  <p className="name truncate">{song.title}</p>
                  <p className="artist">{song.artist}</p>
                  {song.audio_url && (
                    <p className="text-xs text-green-400">Áudio disponível</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-muted-foreground">Nenhuma música adicionada.</div>
          )}
            {songs.length < 3 && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Música
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/5 border border-white/10 backdrop-blur-sm sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-white">Adicionar Nova Música</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Preencha os detalhes da música. O limite é de 3 músicas.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddSong}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right text-white/80">
                        Nome
                      </Label>
                      <Input id="title" name="title" className="col-span-3 bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="artist" className="text-right text-white/80">
                        Artista
                      </Label>
                      <Input id="artist" name="artist" className="col-span-3 bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="icon" className="text-right text-white/80">
                        Ícone
                      </Label>
                      <Input id="icon" name="icon" placeholder="🎵" className="col-span-3 bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="audio-file" className="text-right text-white/80">
                        Arquivo
                      </Label>
                      <Input id="audio-file" name="audio-file" type="file" accept="audio/*" className="col-span-3 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="ghost">Cancelar</Button>
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
