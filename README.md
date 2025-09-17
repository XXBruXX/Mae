# 🌟 Mae - Álbum Digital de Memórias

Uma aplicação web interativa para criação e visualização de memórias digitais pessoais. Combine fotos, textos e música para criar um álbum único e emocionante das suas lembranças mais especiais.

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### Instalação

```bash
# Clonar o repositório
git clone [url-do-repo]
cd Mae

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Executar o script SQL no Supabase
# (copie o conteúdo de supabase-migration.sql)

# Iniciar servidor de desenvolvimento
npm run dev
```

### Acessar
Abra [http://localhost:9002](http://localhost:9002) no seu navegador.

## 📚 Documentação

- **[Prompt Completo do App](./PROMPT_APP.md)** - Descrição detalhada de funcionalidades
- **[Guia de Migração](./MIGRATION_GUIDE.md)** - Migração Firebase → Supabase  
- **[Fluxo de Memórias](./FLUXO_MEMORIAS.md)** - Como funciona a adição de memórias
- **[Lógica do Botão](./LOGICA_BOTAO_ADICIONAR.md)** - Comportamento do botão "Adicionar"

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 15.3.3, React 18.3.1, TypeScript
- **Estilo**: Tailwind CSS, Framer Motion
- **UI**: Radix UI, Lucide React  
- **Backend**: Supabase (PostgreSQL)
- **IA**: Google Genkit

## 📱 Funcionalidades

- ✨ Tela de boas-vindas com efeitos visuais
- 🎵 Seleção de música ambiente personalizada
- 📸 Upload e criação de cards de memórias
- 🎨 Álbum interativo com navegação 3D
- 📱 Design responsivo para todos os dispositivos

## 🎯 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento (porta 9002)
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
npm run typecheck    # Verificar tipos TypeScript
```

---

*Transforme suas memórias em experiências visuais emocionantes* ✨
