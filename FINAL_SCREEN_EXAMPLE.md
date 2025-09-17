# 🎯 Exemplo de Uso - Final Screen com Banco de Dados

## 📋 **Como Integrar as Funções ao Final Screen**

### **1. Import das Funções**

Adicione ao topo do [`final-screen.tsx`](../src/components/final-screen.tsx):

```typescript
import { 
  createSessionWithDefaults,
  updateSessionMessage,
  getSession,
  getFinalScreenConfig 
} from '@/lib/memories';
```

### **2. Gerenciamento de Estado**

Atualize o estado do componente:

```typescript
const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {
  const [customText, setCustomText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState('');
  
  // Novos estados para sessão
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ... resto do código
```

### **3. Criar Sessão ao Entrar na Tela**

```typescript
useEffect(() => {
  const initializeSession = async () => {
    if (isVisible && !sessionId) {
      setIsLoading(true);
      
      try {
        const newSessionId = await createSessionWithDefaults(
          'Álbum de Memórias',
          songTitle
        );
        
        if (newSessionId) {
          setSessionId(newSessionId);
          
          // Carregar mensagem existente se houver
          const session = await getSession(newSessionId);
          if (session?.custom_message) {
            setCustomText(session.custom_message);
          }
        }
      } catch (error) {
        console.error('Erro ao criar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  initializeSession();
}, [isVisible, songTitle, sessionId]);
```

### **4. Salvar Mensagem no Banco**

```typescript
const handleSaveText = async () => {
  if (!sessionId) return;
  
  setIsLoading(true);
  
  try {
    const success = await updateSessionMessage(sessionId, tempText);
    
    if (success) {
      setCustomText(tempText);
      setIsEditing(false);
      
      // Opcional: Toast de sucesso
      toast({
        title: "Mensagem Salva!",
        description: "Sua mensagem personalizada foi salva com sucesso.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao Salvar",
        description: "Não foi possível salvar a mensagem. Tente novamente.",
      });
    }
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    toast({
      variant: "destructive", 
      title: "Erro",
      description: "Erro inesperado ao salvar mensagem.",
    });
  } finally {
    setIsLoading(false);
  }
};
```

### **5. Componente Final Atualizado**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Music, Edit, Loader2 } from 'lucide-react';
import { SparkleButton } from './ui/sparkle-button';
import { useToast } from '@/hooks/use-toast';
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
import { 
  createSessionWithDefaults,
  updateSessionMessage,
  getSession
} from '@/lib/memories';

interface FinalScreenProps {
  isVisible: boolean;
  songTitle?: string;
  onNavigate: () => void;
}

const FinalScreen = ({ isVisible, songTitle, onNavigate }: FinalScreenProps) => {
  const [customText, setCustomText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Inicializar sessão ao entrar na tela
  useEffect(() => {
    const initializeSession = async () => {
      if (isVisible && !sessionId) {
        setIsLoading(true);
        
        try {
          const newSessionId = await createSessionWithDefaults(
            'Álbum de Memórias',
            songTitle
          );
          
          if (newSessionId) {
            setSessionId(newSessionId);
            
            // Carregar mensagem existente
            const session = await getSession(newSessionId);
            if (session?.custom_message) {
              setCustomText(session.custom_message);
            }
          }
        } catch (error) {
          console.error('Erro ao criar sessão:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeSession();
  }, [isVisible, songTitle, sessionId]);

  // Salvar mensagem no banco
  const handleSaveText = async () => {
    if (!sessionId) return;
    
    setIsLoading(true);
    
    try {
      const success = await updateSessionMessage(sessionId, tempText);
      
      if (success) {
        setCustomText(tempText);
        setIsEditing(false);
        
        toast({
          title: "Mensagem Salva!",
          description: "Sua mensagem personalizada foi salva.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao Salvar",
          description: "Tente novamente.",
        });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsLoading(false);
    }
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
        <div className="now-playing-banner">
          <Music className="h-5 w-5 text-white/80" />
          <div className="song-info">
            <span className="playing-text">Tocando Agora:</span>
            <span className="song-title-banner truncate">{songTitle}</span>
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col justify-center items-center text-center w-full max-w-2xl relative">
        {isLoading ? (
          <div className="flex items-center gap-2 text-white/70">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Carregando...</span>
          </div>
        ) : (
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
                  Escreva uma mensagem especial que será salva no seu álbum.
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
                <Button 
                  type="button" 
                  onClick={handleSaveText}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
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
```

---

## 🎯 **Funcionalidades Implementadas**

- ✅ **Criação Automática de Sessão**: Quando usuário entra na final screen
- ✅ **Persistência de Mensagem**: Salva no banco de dados Supabase
- ✅ **Loading States**: Feedback visual durante operações
- ✅ **Error Handling**: Tratamento de erros com toasts
- ✅ **Auto-load**: Carrega mensagem existente se houver
- ✅ **Vinculação com Música**: Associa sessão à música selecionada

---

## 🚀 **Próximos Passos**

1. **Execute o SQL**: [`final-screen-database.sql`](../final-screen-database.sql) no Supabase
2. **Substitua o código**: Use o exemplo acima como base
3. **Teste**: Crie mensagens e verifique se persistem
4. **Integre memórias**: Vincule as memórias criadas à sessão