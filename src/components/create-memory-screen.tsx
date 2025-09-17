'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { type NewMemory } from '@/lib/memories';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CreateMemoryScreenProps {
  isVisible: boolean;
  onSave: (memory: NewMemory) => void;
  onCancel: () => void;
}

const CreateMemoryScreen = ({ isVisible, onSave, onCancel }: CreateMemoryScreenProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSave = () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const image = formData.get('image') as string;
    const text = formData.get('text') as string;

    if (image && text) {
      onSave({ image, text });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Campos Incompletos',
        description: 'Por favor, preencha o ícone e o texto da memória.',
      });
    }
  };

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center transition-all duration-800 ease-out p-4',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-2">Adicionar Novo Card</h2>
          <p className="text-muted-foreground mb-6">
            Adicione um ícone (emoji) e um texto para a sua memória.
          </p>
          <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Ícone</Label>
                <Input id="image" name="image" placeholder="💖" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text">Texto da Memória</Label>
                <Textarea id="text" name="text" placeholder="Uma lembrança especial..." required />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleSave}>
                Salvar Card
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMemoryScreen;
