# Solução para Erro ao Adicionar Música

## Problema Identificado
O erro ocorre porque a tabela `songs` não possui as colunas `audio_url` e `duration`.

## Solução

### 1. Execute o script SQL no Supabase:
1. Acesse: https://anpkpsevskdwjismguox.supabase.co
2. Vá para SQL Editor
3. Execute o conteúdo do arquivo `update-songs-table.sql`

### 2. Reinicie a aplicação:
```bash
npm run dev
```

### 3. Teste adicionar música novamente

## Verificação
Após executar o script, a tabela terá as colunas:
- audio_url (TEXT)
- duration (INTEGER)

O erro será resolvido e você poderá adicionar músicas com sucesso.