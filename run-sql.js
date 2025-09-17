
// run-sql.js
// Este script executa comandos SQL para corrigir problemas de RLS no Supabase.
// ADICIONE SUA CHAVE DE SERVIÇO (SERVICE ROLE KEY) ABAIXO.

const { createClient } = require('@supabase/supabase-js');

// 1. CONFIGURE AS VARIÁVEIS ABAIXO
// =================================
const SUPABASE_URL = 'https://anpkpsevskdwjismguox.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucGtwc2V2c2tkd2ppc21ndW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODEzNDI3MiwiZXhwIjoyMDczNzEwMjcyfQ.Ty1H9tfXQMYap97P0MG3Y6B-NL2nGPaynOsbN42JfQ0'; // IMPORTANTE: Cole sua chave de serviço aqui

const SQL_COMMANDS = `
  ALTER TABLE public.memories DISABLE ROW LEVEL SECURITY;
  ALTER TABLE public.songs DISABLE ROW LEVEL SECURITY;
  ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;
  ALTER TABLE public.final_screen_configs DISABLE ROW LEVEL SECURITY;
`;
// =================================

async function runQuery() {
  if (!SUPABASE_SERVICE_KEY || SUPABASE_SERVICE_KEY === 'COLE_SUA_CHAVE_DE_SERVIÇO_AQUI') {
    console.error('❌ ERRO: A chave de serviço (SUPABASE_SERVICE_KEY) não foi definida.');
    console.log('👉 Obtenha sua chave em: Project Settings > API > Service role key');
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  console.log('🚀 Conectando ao Supabase e executando query...');

  const { error } = await supabase.rpc('exec', { sql: SQL_COMMANDS });

  if (error) {
    console.error('❌ Erro ao executar o SQL:', error);
  } else {
    console.log('✅ Comandos SQL executados com sucesso! As políticas RLS foram desabilitadas.');
    console.log('👉 Teste a aplicação agora.');
  }
}

runQuery();
