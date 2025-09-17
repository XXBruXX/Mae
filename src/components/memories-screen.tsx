'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { type Memory } from '@/lib/memories';
import { Button } from './ui/button';
import { ArrowLeft, Home, Music, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface MemoriesScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onShowFinal: () => void;
  onShowWelcome: () => void;
}

const MemoriesScreen = ({ isVisible, songTitle, onShowFinal, onShowWelcome }: MemoriesScreenProps) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [open, setOpen] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  const memoriesCount = useMemo(() => memories.length, [memories]);

  const nextCard = useCallback(() => {
    if (memoriesCount === 0) return;
    setCurrentCard((prev) => (prev + 1) % memoriesCount);
  }, [memoriesCount]);

  const prevCard = useCallback(() => {
    if (memoriesCount === 0) return;
    setCurrentCard((prev) => (prev - 1 + memoriesCount) % memoriesCount);
  }, [memoriesCount]);

  const goToCard = (index: number) => {
    setCurrentCard(index);
  };
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isVisible) return;
      if (e.key === 'ArrowLeft') prevCard();
      else if (e.key === 'ArrowRight') nextCard();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, prevCard, nextCard]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (memoriesCount === 0) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (memoriesCount === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextCard();
      else prevCard();
    }
  };

  const getCardClassName = (index: number) => {
    if (memoriesCount === 0) return 'hidden';
    if (index === currentCard) return 'active';
    if (index === (currentCard - 1 + memoriesCount) % memoriesCount) return 'prev';
    if (index === (currentCard + 1) % memoriesCount) return 'next';
    return 'hidden';
  };

  const getTransform = (className: string) => {
    switch (className) {
      case 'active': return 'translate(-50%, -50%) scale(1) rotateY(0deg)';
      case 'prev': return 'translate(-80%, -50%) scale(0.8) rotateY(15deg)';
      case 'next': return 'translate(-20%, -50%) scale(0.8) rotateY(-15deg)';
      default: return 'translate(-50%, -50%) scale(0.6)';
    }
  };

  const handleAddMemory = (closeOnSave: boolean) => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const image = formData.get('image') as string;
    const text = formData.get('text') as string;

    if (image && text) {
      const newMemory: Memory = {
        id: (memories.length + 1).toString(),
        image,
        text,
      };
      setMemories(prevMemories => [...prevMemories, newMemory]);
      
      if (closeOnSave) {
        setOpen(false);
      } else {
        form.reset();
        const firstInput = form.querySelector<HTMLInputElement>('input[name="image"]');
        firstInput?.focus();
      }
    }
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center transition-all duration-800 ease-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex items-center gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-white/10 border-2 border-white/30 text-white rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Memória
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Memória</DialogTitle>
              <DialogDescription>
                Adicione um ícone (emoji) e um texto para a sua memória.
              </DialogDescription>
            </DialogHeader>
            <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Ícone
                  </Label>
                  <Input id="image" name="image" placeholder="💖" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="text" className="text-right pt-2">
                    Texto
                  </Label>
                  <Textarea id="text" name="text" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => handleAddMemory(false)}>Salvar e Adicionar Outro</Button>
                <Button type="button" onClick={() => handleAddMemory(true)}>Salvar e Fechar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <Button
          onClick={onShowFinal}
          className="bg-white/10 border-2 border-white/30 text-white rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <Button
          onClick={onShowWelcome}
          className="bg-white/10 border-2 border-white/30 text-white rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          <Home className="mr-2 h-4 w-4" /> Início
        </Button>
      </div>

      <h2 className="font-headline text-4xl sm:text-5xl bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent mb-8 text-center">
        Álbum de Fotos
      </h2>

      <div className="relative w-[90vw] max-w-sm h-[400px] sm:h-[500px] flex items-center justify-center perspective-1000">
        {memories.length === 0 ? (
          <div className="text-center text-white/70">
            <p>Nenhuma memória adicionada ainda.</p>
            <p>Clique em "Adicionar Memória" para começar.</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {memories.map((memory, index) => {
              const className = getCardClassName(index);
              const isCardActive = className === 'active';
              return (
                <div
                  key={memory.id}
                  className={cn(
                    'card absolute w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] bg-white rounded-lg p-4 shadow-[0_15px_40px_rgba(255,255,255,0.2)] transition-all duration-500 ease-out transform-style-3d cursor-pointer left-1/2 top-1/2 flex flex-col',
                    { 'opacity-70': className === 'prev' || className === 'next', 'opacity-0': className === 'hidden', 'z-10': isCardActive, 'z-0': !isCardActive }
                  )}
                  style={{ transform: getTransform(className) }}
                  onClick={() => goToCard(index)}
                >
                  <div className="w-full h-[200px] sm:h-[250px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-md mb-4 flex items-center justify-center text-6xl">
                    {memory.image}
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <p className="font-headline text-xl text-center font-semibold leading-snug text-black">
                      {memory.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {memories.length > 0 && (
        <>
          <div className="flex justify-center gap-2.5 mt-8">
            {memories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={cn(
                  'w-3 h-3 rounded-full bg-white/30 transition-all duration-300',
                  { 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-110': index === currentCard }
                )}
                aria-label={`Go to memory ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-8 text-white/60 text-sm text-center animate-pulse">
            Toque nos cards ou use as bolinhas para navegar
          </div>
        </>
      )}
    </div>
  );
};

export default MemoriesScreen;
