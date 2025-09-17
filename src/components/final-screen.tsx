'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Music, Edit } from 'lucide-react';
import { SparkleButton } from './ui/sparkle-button';
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
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface FinalScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onNavigate: () => void;
}

const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {
  const [customText, setCustomText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState('');

  const handleSaveText = () => {
    setCustomText(tempText);
    setIsEditing(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempText(customText);
    }
    setIsEditing(open);
  }

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center p-5 transition-all duration-800 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {songTitle && (
          <div className="now-playing-banner has-top-buttons">
          <Music className="h-5 w-5 text-white/80" />
          <div className="song-info">
              <span className="playing-text">Tocando Agora:</span>
              <span className="song-title-banner truncate">{songTitle}</span>
          </div>
          </div>
      )}

      {/* Container principal para centralizar o conteúdo */}
      <div className="flex-grow flex flex-col justify-center items-center text-center w-full max-w-2xl relative">
        <Dialog open={isEditing} onOpenChange={handleOpenChange}>
          {customText ? (
            <DialogTrigger asChild>
                <div className="relative group cursor-pointer">
                    <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                        {customText}
                    </p>
                    <div className="absolute -top-2 -right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit className="h-4 w-4 text-white/70" />
                    </div>
                </div>
            </DialogTrigger>
          ) : (
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-transparent border-white/30 hover:bg-white/10">
                <Edit className="mr-2 h-4 w-4" /> Adicionar Mensagem
              </Button>
            </DialogTrigger>
          )}
          <DialogContent className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle>Mensagem Personalizada</DialogTitle>
              <DialogDescription>
                Escreva uma mensagem especial que aparecerá nesta tela. Você pode editá-la depois clicando nela.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Sua mensagem aqui..."
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveText}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
