# 🎯 SQL para Final Screen - App Mae

## 📋 **Visão Geral**

Este documento descreve a estrutura de banco de dados necessária para suportar todas as funcionalidades da [`final-screen.tsx`](../src/components/final-screen.tsx), incluindo:

- ✅ Armazenamento de mensagens personalizadas
- ✅ Gerenciamento de sessões/álbuns
- ✅ Configurações da tela final
- ✅ Vinculação de memórias às sessões

---

## 🗄️ **Estrutura do Banco de Dados**

### **1. Tabela `sessions`**
Armazena informações de cada álbum/sessão criada:

```sql
sessions:
├── id (UUID, PRIMARY KEY)
├── user_id (TEXT) - Para futuro sistema de usuários
├── title (TEXT) - Título do álbum
├── custom_message (TEXT) - Mensagem personalizada da final screen
├── selected_song_id (UUID) - Referência à música escolhida
├── selected_song_title (TEXT) - Cache do título da música
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### **2. Tabela `final_screen_configs`**
Configurações específicas da tela final:

```sql
final_screen_configs:
├── id (UUID, PRIMARY KEY)
├── session_id (UUID, FOREIGN KEY)
├── custom_message (TEXT) - Mensagem personalizada
├── show_music_banner (BOOLEAN) - Mostrar banner de música
├── message_position (TEXT) - center|top|bottom
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### **3. Atualização `memories`**
Vinculação de memórias às sessões:

```sql
memories (atualizada):
├── ... (campos existentes)
└── session_id (UUID, FOREIGN KEY) - Nova coluna
```

---

## ⚡ **Instalação e Configuração**

### **Passo 1: Executar SQL no Supabase**

1. Acesse: [SQL Editor do Supabase](https://supabase.com/dashboard/project/anpkpsevskdwjismguox/sql)
2. Execute o arquivo: [`final-screen-database.sql`](../final-screen-database.sql)

### **Passo 2: Adicionar Funções ao Código**

Adicione as funções do arquivo [`final-screen-functions.ts`](../final-screen-functions.ts) ao arquivo [`src/lib/memories.ts`](../src/lib/memories.ts):

```typescript
// Adicionar no final do arquivo memories.ts
// ... código das funções aqui
```

### **Passo 3: Atualizar Tipos do Supabase**

Atualize [`src/lib/supabase.ts`](../src/lib/supabase.ts) com os novos tipos:

```typescript
export type Database = {
  public: {
    Tables: {
      // ... tabelas existentes
      sessions: {
        Row: {
          id: string
          user_id?: string
          title: string
          custom_message?: string
          selected_song_id?: string
          selected_song_title?: string
          created_at: string
          updated_at: string
        }
        // ... Insert e Update types
      }
      final_screen_configs: {
        // ... definir tipos similares
      }
    }
  }
}
```

---

## 🔧 **Funcionalidades Implementadas**

### **📝 Mensagens Personalizadas**
- Usuário pode adicionar/editar mensagem na final screen
- Mensagem é salva no banco de dados
- Persistência entre sessões

### **🎵 Integração com Música**
- Banner "Tocando Agora" aparece quando há música selecionada
- Cache do título da música na sessão
- Referência ao objeto completo da música

### **🗂️ Gerenciamento de Sessões**
- Cada álbum é uma sessão única
- Memórias são vinculadas à sessão
- Histórico de álbuns criados

### **⚙️ Configurações Avançadas**
- Posição da mensagem (centro, topo, fundo)
- Controle de visibilidade do banner de música
- Configurações por sessão

---

## 🚀 **Como Usar no Código**

### **Criar Nova Sessão:**
```typescript
import { createSessionWithDefaults } from '@/lib/memories';

const sessionId = await createSessionWithDefaults(
  'Meu Álbum Especial',
  selectedSongTitle,
  selectedSongId
);
```

### **Salvar Mensagem Personalizada:**
```typescript
import { updateSessionMessage } from '@/lib/memories';

await updateSessionMessage(sessionId, customMessage);
```

### **Buscar Configurações:**
```typescript
import { getFinalScreenConfig } from '@/lib/memories';

const config = await getFinalScreenConfig(sessionId);
```

---

## 📊 **Exemplo de Uso Completo**

```typescript
// 1. Criar sessão quando usuário entra na final screen
const sessionId = await createSessionWithDefaults(
  'Álbum de Memórias',
  selectedSongTitle
);

// 2. Salvar mensagem quando usuário edita
const handleSaveMessage = async (message: string) => {
  await updateSessionMessage(sessionId, message);
  setCustomText(message);
};

// 3. Vincular memórias da sessão atual
if (sessionMemories.length > 0) {
  const memoryIds = await Promise.all(
    sessionMemories.map(memory => addMemory(memory))
  );
  await linkMemoriesToSession(memoryIds, sessionId);
}
```

---

## ✅ **Checklist de Implementação**

- [ ] Executar [`final-screen-database.sql`](../final-screen-database.sql) no Supabase
- [ ] Adicionar funções ao [`memories.ts`](../src/lib/memories.ts)
- [ ] Atualizar tipos em [`supabase.ts`](../src/lib/supabase.ts)
- [ ] Integrar com [`final-screen.tsx`](../src/components/final-screen.tsx)
- [ ] Testar criação de sessões
- [ ] Testar salvamento de mensagens
- [ ] Verificar vinculação de memórias

---

## 🎯 **Benefícios**

1. **Persistência Total**: Mensagens e configurações são mantidas
2. **Organização**: Cada álbum é uma sessão independente
3. **Escalabilidade**: Suporte a múltiplos usuários no futuro
4. **Flexibilidade**: Configurações personalizáveis por sessão
5. **Performance**: Índices otimizados para consultas rápidas

---

## 🔮 **Recursos Futuros**

- **Sistema de Usuários**: Login e álbuns privados
- **Compartilhamento**: URLs públicas para álbuns
- **Templates**: Mensagens predefinidas
- **Temas**: Diferentes estilos para final screen
- **Estatísticas**: Analytics de uso dos álbuns