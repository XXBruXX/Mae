'use client';

import { useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { initialMemories, type Memory } from '@/lib/memories';
import { Button } from './ui/button';
import { ArrowRight, Loader2, Wand2, Music, ArrowLeft } from 'lucide-react';
import { enhanceMemory } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface MemoriesScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onShowMusic: () => void;
  onShowFinal: () => void;
}

const MemoriesScreen = ({ isVisible, songTitle, onShowMusic, onShowFinal }: MemoriesScreenProps) => {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [enhancingMemoryId, setEnhancingMemoryId] = useState<string | null>(null);
  const { toast } = useToast();

  const memoriesCount = useMemo(() => memories.length, [memories]);

  const nextCard = useCallback(() => {
    setCurrentCard((prev) => (prev + 1) % memoriesCount);
  }, [memoriesCount]);

  const prevCard = useCallback(() => {
    setCurrentCard((prev) => (prev - 1 + memoriesCount) % memoriesCount);
  }, [memoriesCount]);

  const goToCard = (index: number) => {
    setCurrentCard(index);
  };
  
  const handleEnhance = async (memory: Memory) => {
    setEnhancingMemoryId(memory.id);
    startTransition(async () => {
      const newText = await enhanceMemory({ image: memory.image, text: memory.text });
      if (newText.includes('Não foi possível')) {
         toast({
          title: "Erro na IA",
          description: newText,
          variant: "destructive",
        });
      } else {
        setMemories((prevMemories) =>
          prevMemories.map((m) => (m.id === memory.id ? { ...m, text: newText } : m))
        );
      }
      setEnhancingMemoryId(null);
    });
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
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextCard();
      else prevCard();
    }
  };

  const getCardClassName = (index: number) => {
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

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center transition-all duration-800 ease-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
       <Button
        variant="ghost"
        onClick={onShowMusic}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white/10 border-2 border-white/30 text-white rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      {songTitle && (
        <div className="now-playing-banner">
          <Music className="h-5 w-5 text-white/80" />
          <div className="song-info">
            <span className="playing-text">Tocando Agora:</span>
            <span className="song-title-banner truncate">{songTitle}</span>
          </div>
        </div>
      )}

      {currentCard === memoriesCount - 1 && (
        <Button
          onClick={onShowFinal}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/10 border-2 border-white/30 text-white rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          Finalizar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}

      <h2 className="font-headline text-4xl sm:text-5xl bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent mb-8 text-center">
        Álbum de Fotos
      </h2>

      <div className="relative w-[90vw] max-w-sm h-[400px] sm:h-[500px] flex items-center justify-center perspective-1000">
        <div className="relative w-full h-full">
          {memories.map((memory, index) => {
            const className = getCardClassName(index);
            const isCardActive = className === 'active';
            return (
              <div
                key={memory.id}
                className={cn(
                  'card absolute w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] bg-card text-card-foreground rounded-lg p-4 shadow-[0_15px_40px_rgba(255,255,255,0.2)] transition-all duration-500 ease-out transform-style-3d cursor-pointer left-1/2 top-1/2 flex flex-col',
                  { 'opacity-70': className === 'prev' || className === 'next', 'opacity-0': className === 'hidden', 'z-10': isCardActive, 'z-0': !isCardActive }
                )}
                style={{ transform: getTransform(className) }}
                onClick={() => goToCard(index)}
              >
                <div className="w-full h-[200px] sm:h-[250px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-md mb-4 flex items-center justify-center text-6xl">
                  {memory.image}
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <p className="font-headline text-xl text-center text-gray-700 font-semibold leading-snug">
                    {memory.text}
                  </p>
                </div>
                 {isCardActive && (
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 bg-accent/80 text-accent-foreground rounded-full hover:bg-accent h-9 w-9 p-2"
                    onClick={(e) => { e.stopPropagation(); handleEnhance(memory); }}
                    disabled={isPending && enhancingMemoryId === memory.id}
                  >
                    {isPending && enhancingMemoryId === memory.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Wand2 className="h-5 w-5" />
                    )}
                    <span className="sr-only">Enhance message</span>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

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
    </div>
  );
};

export default MemoriesScreen;
