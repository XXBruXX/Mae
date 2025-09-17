'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { type NewMemory, addMemory } from '@/lib/memories';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface AddMemoriesScreenProps {
  isVisible: boolean;
  sessionMemories: NewMemory[];
  onAddCard: () => void;
  onFinish: () => void;
}

const AddMemoriesScreen = ({ isVisible, sessionMemories, onAddCard, onFinish }: AddMemoriesScreenProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveAll = async () => {
    if (sessionMemories.length === 0) {
      onFinish();
      return;
    }

    setIsSaving(true);
    try {
      await Promise.all(sessionMemories.map(memory => addMemory(memory)));
      
      toast({
        title: "Memórias Salvas!",
        description: `${sessionMemories.length} nova(s) memória(s) foram adicionadas ao álbum.`,
      });

      setIsSaving(false);
      onFinish();

    } catch (error) {
      console.error("Error saving memories:", error);
      toast({
        variant: "destructive",
        title: "Erro ao Salvar",
        description: "Não foi possível salvar as memórias. Tente novamente.",
      });
      setIsSaving(false);
    }
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center transition-all duration-800 ease-out p-4',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="w-full max-w-md text-center">
        <h2 className="font-headline text-3xl sm:text-4xl bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-4">
          Modo de Edição
        </h2>
        <p className="text-white/70 mb-8">
          Adicione quantos cards de memória desejar. Quando terminar, salve tudo para ver no álbum.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8 min-h-[150px]">
          <h3 className="text-lg font-semibold text-white mb-4">Cards Adicionados ({sessionMemories.length})</h3>
          {sessionMemories.length === 0 ? (
            <p className="text-white/50">Nenhum card adicionado nesta sessão.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {sessionMemories.map((mem, index) => (
                <div key={index} className="bg-white/10 rounded-md p-2 flex flex-col items-center gap-2 aspect-square justify-center overflow-hidden">
                  <div className="relative w-full h-16">
                    <Image src={mem.image} alt="Memória" fill objectFit="cover" className="rounded-sm" />
                  </div>
                  <p className="text-xs text-white/80 truncate w-full text-center">{mem.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onAddCard}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Card
          </Button>
          <Button 
              variant="secondary" 
              onClick={handleSaveAll}
              disabled={isSaving}
          >
              {isSaving ? 'Salvando...' : (sessionMemories.length > 0 ? 'Salvar e Ver Álbum' : 'Voltar para o Álbum')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMemoriesScreen;
