# 🌟 Mae - Álbum Digital de Memórias

## 📋 **Descrição do App**

**Mae** é uma aplicação web interativa para criação e visualização de memórias digitais pessoais. Combine fotos, textos e música para criar um álbum único e emocionante das suas lembranças mais especiais.

## ✨ **Funcionalidades Principais**

### 🎵 **1. Seleção Musical**
- Escolha uma música de fundo para ambientar suas memórias
- Adicione até 3 músicas personalizadas com título, artista e ícone
- Player integrado com animações visuais
- Opção de pular para quem prefere silêncio

### 📸 **2. Criação de Memórias**
- **Upload de Imagens**: Suporte para PNG, JPEG e GIF (sem limite de tamanho)
- **Textos Personalizados**: Adicione descrições e contexto às suas fotos
- **Múltiplos Cards**: Crie quantas memórias desejar em uma sessão
- **Preview em Tempo Real**: Veja como ficará antes de salvar

### 🎨 **3. Álbum Interativo**
- **Navegação 3D**: Cards com efeitos de perspectiva e rotação
- **Controles Intuitivos**: 
  - Setas do teclado para navegar
  - Toque nos cards (mobile)
  - Indicadores visuais (bolinhas)
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile

### 🌌 **4. Experiência Visual Rica**
- **Fundo Animado**: Partículas e estrelas em movimento
- **Transições Suaves**: Animações com Framer Motion
- **Gradientes Modernos**: Design contemporâneo e elegante
- **Interface Glassmorphism**: Elementos com transparência e blur

## 🎯 **Jornada do Usuário**

```
1. 🚀 Tela de Boas-vindas
   ├── Efeitos visuais com partículas
   └── Botão "Começar" com animação
   
2. 🎵 Seleção de Música
   ├── Player com músicas pré-carregadas
   ├── Opção de adicionar música personalizada
   └── Escolher ou pular para continuar
   
3. ✨ Tela de Transição
   ├── Exibe música selecionada
   └── Animação de entrada para o álbum
   
4. 📱 Álbum de Memórias
   ├── Visualização em carrossel 3D
   ├── Botão "Adicionar Memórias" (se álbum vazio)
   └── Navegação intuitiva entre cards
   
5. 🎨 Modo de Edição (opcional)
   ├── Tela para adicionar múltiplos cards
   ├── Formulário para upload e texto
   ├── Preview dos cards adicionados
   └── Salvamento em lote
```

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **Next.js 15.3.3** - Framework React com App Router
- **React 18.3.1** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna
- **Framer Motion** - Animações fluidas

### **UI/UX**
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **@tsparticles** - Efeitos de partículas
- **React Hook Form + Zod** - Formulários validados

### **Backend & Dados**
- **Supabase** - Banco PostgreSQL
- **@supabase/supabase-js** - Cliente oficial
- **Real-time** - Atualizações em tempo real

### **IA & Processamento**
- **Google Genkit** - Flows de IA para processamento
- **@genkit-ai/googleai** - Integração com Google AI

## 🎨 **Design System**

### **Cores**
- **Fundo**: Preto (#000000) com overlay de partículas
- **Texto Principal**: Branco e gradientes cinza
- **Elementos**: Glassmorphism com white/10 opacity
- **Destaque**: Gradientes from-gray-400 via-gray-300 to-white

### **Tipografia**
- **Título**: font-headline com gradientes
- **Corpo**: Sistema padrão com hierarquia clara
- **Tamanhos**: Responsivos (sm, md, lg)

### **Animações**
- **Transições**: 800ms ease-out
- **Cards**: Transform 3D com perspectiva
- **Hover**: Estados visuais sutis
- **Loading**: Spinners e skeletons

## 🚀 **Como Usar**

### **Para Usuários**
1. **Acesse** a aplicação no navegador
2. **Clique** em "Começar" na tela inicial
3. **Escolha** uma música (opcional)
4. **Visualize** ou **adicione** memórias
5. **Navegue** pelo seu álbum personalizado

### **Para Desenvolvedores**
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com credenciais do Supabase

# Executar em desenvolvimento
npm run dev

# Acessar em http://localhost:9002
```

## 📱 **Compatibilidade**

### **Navegadores Suportados**
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Navegadores móveis modernos

### **Dispositivos**
- ✅ **Desktop**: Experiência completa com teclado
- ✅ **Tablet**: Touch otimizado com gestos
- ✅ **Mobile**: Interface responsiva e intuitiva

## 🎯 **Público-Alvo**

### **Primário**
- **Adultos jovens (25-40 anos)** que valorizam memórias digitais
- **Famílias** querendo preservar momentos especiais
- **Criadores de conteúdo** buscando formas criativas de apresentação

### **Secundário**
- **Estudantes** documentando experiências
- **Profissionais** criando portfólios visuais
- **Idosos** preservando histórias de vida

## 💡 **Diferenciais**

### **🎨 Experiência Visual Única**
- Interface imersiva com efeitos de partículas
- Navegação 3D inovadora nos cards
- Design glassmorphism moderno

### **🎵 Integração Musical**
- Música como elemento narrativo
- Player integrado e personalizável
- Atmosfera emocional

### **📱 Simplicidade de Uso**
- Fluxo intuitivo e linear
- Sem necessidade de tutoriais
- Interface autoexplicativa

### **⚡ Performance Otimizada**
- Carregamento rápido com Next.js
- Animações suaves sem travamentos
- Responsividade total

## 🏆 **Casos de Uso**

### **Pessoal**
- 📸 Álbum de viagem com trilha sonora
- 👶 Crescimento dos filhos documentado
- 💝 Presentes digitais personalizados
- 🎓 Marcos importantes da vida

### **Profissional**
- 🎨 Portfolio criativo interativo
- 📈 Apresentações comerciais diferenciadas
- 🏢 História da empresa visualizada
- 🎪 Eventos e celebrações corporativas

---

**Mae** transforma memórias simples em experiências visuais emocionantes, combinando tecnologia moderna com design intuitivo para criar algo verdadeiramente especial. ✨