const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://anpkpsevskdwjismguox.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucGtwc2V2c2tkd2ppc21ndW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MDY5MDEsImV4cCI6MjA1Mjk4MjkwMX0.-7Yq-0UQl1rnswJYvFnJX4PfgQWmTh8n3Zy8g6rQtpM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixDatabasePolicies() {
  console.log('🔧 Iniciando correção das políticas RLS...');
  
  try {
    // Desabilitar RLS para todas as tabelas (modo desenvolvimento)
    const tables = ['memories', 'songs', 'sessions', 'final_screen_configs'];
    
    for (const table of tables) {
      console.log(`📋 Desabilitando RLS para tabela: ${table}`);
      
      const { data, error } = await supabase.rpc('exec_sql', {
        query: `ALTER TABLE public.${table} DISABLE ROW LEVEL SECURITY;`
      });
      
      if (error) {
        console.log(`⚠️  Erro ao desabilitar RLS para ${table}:`, error.message);
        // Tentar alternativa: criar políticas permissivas
        await createPermissivePolicies(table);
      } else {
        console.log(`✅ RLS desabilitado para ${table}`);
      }
    }
    
    console.log('🎉 Correção concluída! Teste o app novamente.');
    
  } catch (error) {
    console.error('❌ Erro durante a correção:', error);
    console.log('\n📋 Execute manualmente no painel do Supabase:');
    console.log('ALTER TABLE public.memories DISABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE public.songs DISABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE public.final_screen_configs DISABLE ROW LEVEL SECURITY;');
  }
}

async function createPermissivePolicies(tableName) {
  console.log(`🔑 Criando políticas permissivas para ${tableName}`);
  
  const policies = [
    `CREATE POLICY IF NOT EXISTS "Enable read access for all users" ON public.${tableName} FOR SELECT USING (true);`,
    `CREATE POLICY IF NOT EXISTS "Enable insert access for all users" ON public.${tableName} FOR INSERT WITH CHECK (true);`,
    `CREATE POLICY IF NOT EXISTS "Enable update access for all users" ON public.${tableName} FOR UPDATE USING (true);`,
    `CREATE POLICY IF NOT EXISTS "Enable delete access for all users" ON public.${tableName} FOR DELETE USING (true);`
  ];
  
  for (const policy of policies) {
    try {
      await supabase.rpc('exec_sql', { query: policy });
      console.log(`✅ Política criada para ${tableName}`);
    } catch (error) {
      console.log(`⚠️  Política já existe ou erro: ${error.message}`);
    }
  }
}

// Testar conexão primeiro
async function testConnection() {
  console.log('🔍 Testando conexão com Supabase...');
  
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('❌ Erro de conexão (esperado - erro 401):', error.message);
      return false;
    } else {
      console.log('✅ Conexão OK');
      return true;
    }
  } catch (error) {
    console.log('❌ Erro de conexão:', error.message);
    return false;
  }
}

// Executar o script
async function main() {
  console.log('🚀 Script de correção das políticas RLS do Supabase');
  console.log('=' .repeat(50));
  
  await testConnection();
  
  console.log('\n📝 INSTRUÇÕES MANUAIS:');
  console.log('1. Acesse: https://supabase.com/dashboard/project/anpkpsevskdwjismguox');
  console.log('2. Vá para: SQL Editor');
  console.log('3. Execute cada comando abaixo:');
  console.log('\n-- Desabilitar RLS (recomendado para desenvolvimento)');
  console.log('ALTER TABLE public.memories DISABLE ROW LEVEL SECURITY;');
  console.log('ALTER TABLE public.songs DISABLE ROW LEVEL SECURITY;');
  console.log('ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;');
  console.log('ALTER TABLE public.final_screen_configs DISABLE ROW LEVEL SECURITY;');
  
  console.log('\n🔄 Após executar, recarregue a página do seu app.');
}

main().catch(console.error);