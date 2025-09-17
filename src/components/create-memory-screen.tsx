'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { type NewMemory } from '@/lib/memories';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface CreateMemoryScreenProps {
  isVisible: boolean;
  onSave: (memory: NewMemory) => void;
  onCancel: () => void;
}

const CreateMemoryScreen = ({ isVisible, onSave, onCancel }: CreateMemoryScreenProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string>('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
            variant: 'destructive',
            title: 'Imagem Muito Grande',
            description: 'Por favor, escolha uma imagem com menos de 2MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setImageDataUri(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const form = formRef.current;
    if (!form) return;

    const text = (form.elements.namedItem('text') as HTMLTextAreaElement).value;

    if (imageDataUri && text) {
      onSave({ image: imageDataUri, text });
      form.reset();
      setImagePreview(null);
      setImageDataUri('');
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Campos Incompletos',
        description: 'Por favor, adicione uma imagem e o texto da memória.',
      });
    }
  };

  const handleCancel = () => {
    onCancel();
    if(formRef.current) formRef.current.reset();
    setImagePreview(null);
    setImageDataUri('');
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center transition-all duration-800 ease-out p-4',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-2 text-white">Adicionar Novo Card</h2>
          <p className="text-white/60 mb-6">
            Escolha uma imagem e adicione um texto para a sua memória.
          </p>
          <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="image" className="text-white/80">Imagem</Label>
                <Input 
                  id="image" 
                  name="image" 
                  type="file" 
                  accept="image/png, image/jpeg, image/gif"
                  required 
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
              </div>
              {imagePreview && (
                <div className="flex justify-center">
                    <Image src={imagePreview} alt="Preview da memória" width={128} height={128} className="rounded-md object-cover aspect-square" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="text" className="text-white/80">Texto da Memória</Label>
                <Textarea 
                  id="text" 
                  name="text" 
                  placeholder="Uma lembrança especial..." 
                  required 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <Button type="button" variant="ghost" onClick={handleCancel}>
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
