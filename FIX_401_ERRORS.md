# Correção dos Erros 401 do Supabase

## Problema Identificado
Os erros 401 (Unauthorized) indicam problemas de autenticação com o Supabase, geralmente relacionados a:
1. Arquivo `.env.local` inexistente
2. Políticas RLS (Row Level Security) restritivas

## Soluções Implementadas

### 1. Arquivo .env.local Criado
- ✅ Criado arquivo `.env.local` com as credenciais do Supabase
- ✅ Next.js agora pode acessar as variáveis de ambiente corretamente

### 2. Script SQL para Políticas RLS
- ✅ Criado arquivo `fix-rls-policies.sql` 
- ✅ Este arquivo contém comandos para desabilitar RLS ou criar políticas permissivas

### 3. Configuração do Cliente Supabase Melhorada
- ✅ Adicionado logging para debug
- ✅ Configurado cliente sem persistência de sessão para desenvolvimento

## Como Aplicar as Correções

### Opção 1: Execute o Script SQL no Supabase
1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Vá para o seu projeto: anpkpsevskdwjismguox
3. Abra a seção "SQL Editor"
4. Cole e execute o conteúdo do arquivo `fix-rls-policies.sql`

### Opção 2: Reinicie o Servidor de Desenvolvimento
1. Pare o servidor atual (Ctrl+C)
2. Execute: `npm run dev`
3. Verifique se os logs mostram "Supabase configurado com sucesso"

## Verificação
Após aplicar as correções, você deve ver:
- ✅ Logs de sucesso do Supabase no console
- ✅ Carregamento correto das músicas
- ✅ Funcionamento normal do app sem erros 401

## Se os Problemas Persistirem
1. Verifique se a chave ANON do Supabase está correta
2. Confirme se as tabelas existem no banco de dados
3. Verifique as configurações de RLS no painel do Supabase