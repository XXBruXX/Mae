'use client';

import { cn } from '@/lib/utils';
import { Music, Edit } from 'lucide-react';
import { SparkleButton } from './ui/sparkle-button';
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from './ui/dialog';

interface FinalScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onNavigate: () => void;
}

const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {
  const [customText, setCustomText] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleSaveText = () => {
    setCustomText(editText);
  };

  const defaultText = "Hoje é um dia especial, e celebramos não apenas seu aniversário, mas a pessoa incrível que você é. Sua força, amor e carinho são a luz que guia nossa família. Que este novo ciclo traga ainda mais felicidade, saúde e momentos inesquecíveis. Nós te amamos infinitamente.";

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
          {customText ?? defaultText}
        </p>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="absolute top-0 right-0 mt-4 mr-4 bg-transparent border-white/30 hover:bg-white/10">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/5 border-white/10 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle className="text-white">Editar Mensagem</DialogTitle>
                </DialogHeader>
                <Textarea 
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Digite sua mensagem personalizada aqui..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" onClick={handleSaveText}>Salvar</Button>
                    </DialogClose>
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
