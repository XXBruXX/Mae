# 🔄 Migração do Firebase para Supabase

Este guia te ajudará a migrar completamente do Firebase Firestore para Supabase PostgreSQL.

## ✅ O que foi alterado

### 1. **Dependências atualizadas**
- ❌ Removido: `firebase`
- ✅ Adicionado: `@supabase/supabase-js`

### 2. **Arquivos modificados**
- `src/lib/memories.ts` - Funções do banco migradas para Supabase
- `src/lib/supabase.ts` - Nova configuração do Supabase
- `src/lib/migrate-data.ts` - Script de migração de dados
- `supabase-migration.sql` - Script SQL para criar tabelas

### 3. **Novos arquivos de configuração**
- `.env.example` - Exemplo de variáveis de ambiente

## 🚀 Como completar a migração

### Passo 1: Criar projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta/projeto
3. Anote a URL do projeto e a chave anônima

### Passo 2: Configurar variáveis de ambiente
1. Copie `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edite `.env.local` com suas credenciais do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
   ```

### Passo 3: Criar tabelas no Supabase
1. Acesse o SQL Editor do seu projeto Supabase
2. Execute o conteúdo do arquivo `supabase-migration.sql`
3. Verifique se as tabelas foram criadas corretamente

### Passo 4: Migrar dados existentes (opcional)
Se você tem dados no Firebase:

1. Exporte seus dados do Firebase
2. Edite `src/lib/migrate-data.ts` com seus dados
3. Execute a migração:
   ```bash
   npm run dev
   # Em outro terminal:
   node -e "require('./src/lib/migrate-data.ts').migrateAllData()"
   ```

### Passo 5: Testar a aplicação
```bash
npm run dev
```

Acesse http://localhost:9002 e teste:
- ✅ Adicionar memórias
- ✅ Visualizar memórias
- ✅ Adicionar músicas
- ✅ Listar músicas

## 📊 Estrutura do banco de dados

### Tabela: `memories`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Chave primária (auto-gerada) |
| image | TEXT | URL da imagem |
| text | TEXT | Texto da memória |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

### Tabela: `songs`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Chave primária (auto-gerada) |
| title | TEXT | Título da música |
| artist | TEXT | Nome do artista |
| icon | TEXT | Ícone/emoji |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

## 🔒 Configurações de segurança

O script SQL já configura:
- ✅ Row Level Security (RLS) habilitado
- ✅ Políticas básicas de acesso
- ✅ Triggers para updated_at automático
- ✅ Índices para performance

**⚠️ Importante**: Em produção, configure políticas RLS mais restritivas conforme suas necessidades de segurança.

## 🚨 Solução de problemas

### Erro de autenticação
- Verifique se as variáveis de ambiente estão corretas
- Confirme se a chave anônima está ativa no Supabase

### Erro de tabelas não encontradas
- Execute o script SQL no Supabase
- Verifique se as tabelas foram criadas na schema `public`

### Erro de CORS
- Configure o domínio correto nas configurações do Supabase
- Adicione `localhost:9002` nos domínios permitidos

## 🎯 Vantagens da migração

### Performance
- ✅ Consultas SQL mais eficientes
- ✅ Índices otimizados
- ✅ Cache automático

### Funcionalidades
- ✅ Real-time subscriptions
- ✅ Triggers e funções personalizadas
- ✅ Backup automático

### Desenvolvimento
- ✅ TypeScript nativo
- ✅ API REST automática
- ✅ Interface de administração

## 📞 Suporte

Se você encontrar problemas:
1. Verifique os logs no console do navegador
2. Confira a configuração das variáveis de ambiente
3. Teste a conexão com o Supabase na interface web

A migração está completa! 🎉