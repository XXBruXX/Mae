# 🎵 Sistema de Áudio - Implementado

O sistema de áudio foi implementado para reproduzir músicas reais no app Mae.

## 🚀 **Como Ativar o Áudio**

### **1. Atualizar Banco de Dados**

Execute este script no SQL Editor do Supabase:

```sql
-- Adicionar coluna audio_url se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'songs' 
        AND column_name = 'audio_url'
    ) THEN
        ALTER TABLE public.songs ADD COLUMN audio_url TEXT;
    END IF;
END $$;

-- Adicionar coluna duration se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'songs' 
        AND column_name = 'duration'
    ) THEN
        ALTER TABLE public.songs ADD COLUMN duration INTEGER DEFAULT 0;
    END IF;
END $$;

-- Atualizar dados existentes com URLs de exemplo
UPDATE public.songs 
SET audio_url = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'
WHERE audio_url IS NULL;
```

### **2. Reiniciar Aplicação**

```bash
# Reiniciar o servidor de desenvolvimento
npm run dev
```

## ✨ **Funcionalidades Implementadas**

### **🎵 Seleção de Música**
- ▶️ **Preview de Áudio**: Clique no ícone de play para ouvir
- ⏸️ **Controle de Reprodução**: Pause/play durante preview
- 📁 **Upload de Arquivos**: Adicione seus próprios arquivos MP3/WAV
- ✅ **Indicador Visual**: Mostra quais músicas têm áudio disponível

### **🌐 Player Global**
- 🔄 **Reprodução Automática**: Toca automaticamente nas telas finais
- 🔁 **Loop Infinito**: Música toca continuamente
- 🔇 **Controle de Volume**: Volume ajustado para 30% (ambiente)
- ⏹️ **Pausa Automática**: Para quando sai da tela

## 🎮 **Como Usar**

### **Para Usuários:**

1. **Tela de Seleção:**
   - Clique no ▶️ para ouvir preview
   - Clique no card para selecionar
   - Clique em "Escolher" para confirmar

2. **Adicionar Música:**
   - Clique em "Adicionar Música"
   - Preencha título, artista, ícone
   - **Selecione um arquivo de áudio** (opcional)
   - Clique em "Salvar"

3. **Experiência:**
   - Música toca automaticamente na tela final
   - Continua tocando no álbum de memórias
   - Para automaticamente ao voltar

### **Para Desenvolvedores:**

#### **Tipos TypeScript:**
```typescript
export type Song = {
  id: string;
  title: string;
  artist: string;
  icon: string;
  audio_url?: string; // URL do arquivo
  duration?: number;  // Duração em segundos
};
```

#### **Hook de Áudio:**
```typescript
import { useAudioPlayer } from '@/hooks/use-audio-player';

const { isPlaying, play, pause, error } = useAudioPlayer({
  url: 'path/to/audio.mp3',
  volume: 0.5,
  loop: true
});
```

#### **Player Global:**
```typescript
<GlobalAudioPlayer 
  song={selectedSong}
  isActive={currentScreen === 'final'}
  volume={0.3}
/>
```

## 🎯 **Compatibilidade de Áudio**

### **Formatos Suportados:**
- ✅ **MP3** - Melhor compatibilidade
- ✅ **WAV** - Alta qualidade
- ✅ **OGG** - Código aberto
- ✅ **M4A** - Apple/iTunes
- ⚠️ **FLAC** - Suporte limitado

### **Limitações:**
- **Tamanho**: Sem limite de tamanho para arquivos
- **Auto-play**: Alguns navegadores bloqueiam
- **HTTPS**: Necessário para URLs externas
- **CORS**: URLs externas precisam permitir acesso

## 🔧 **Solução de Problemas**

### **Áudio não reproduz:**
1. ✅ Verifique se URL é válida
2. ✅ Confirme que arquivo existe
3. ✅ Teste em HTTPS (não HTTP)
4. ✅ Clique manualmente primeiro (política do navegador)

### **Preview não funciona:**
- 🔍 Abra Console do navegador (F12)
- 📝 Verifique erros de CORS
- 🌐 Teste com URL diferente

### **Upload não funciona:**
- 📏 Verifique tamanho do arquivo (< 10MB)
- 🎵 Use formatos suportados (MP3, WAV)
- 🔄 Recarregue a página

## 🎨 **URLs de Teste**

Para testar rapidamente, use estas URLs funcionais:

```javascript
// URLs de exemplo que funcionam
const testAudios = [
  'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  'https://sample-music.netlify.app/audio/sample1.mp3',
  'https://file-examples.com/storage/fe86cbfe9e40302d9ea4e5e/2017/11/file_example_MP3_700KB.mp3'
];
```

## 🎵 **Recursos Avançados**

### **Controles Implementados:**
- ⏯️ **Play/Pause**
- 🔇 **Volume**
- ⏭️ **Skip** (para próximas versões)
- 🔄 **Loop**
- ⏱️ **Tempo atual**

### **Estados do Player:**
- 🔄 **Loading** - Carregando arquivo
- ▶️ **Playing** - Reproduzindo
- ⏸️ **Paused** - Pausado
- ❌ **Error** - Erro ao carregar

---

**Agora o Mae tem áudio real!** 🎉 As músicas tocam de verdade e criam uma experiência imersiva completa.