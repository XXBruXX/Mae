// Utilitário de diagnóstico para problemas do Supabase
import { supabase } from './supabase';

export const diagnoseSupabaseIssues = async () => {
  console.log('🔍 DIAGNÓSTICO SUPABASE');
  console.log('=' .repeat(50));
  
  // 1. Verificar conexão básica
  console.log('1️⃣ Testando conexão básica...');
  try {
    const { data, error } = await supabase.from('songs').select('count').limit(1);
    if (error) {
      console.log('❌ Erro de conexão:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // Verificar se é erro 401/RLS
      if (error.code === 'PGRST301' || error.message?.includes('RLS') || error.message?.includes('policy')) {
        console.log('🔒 PROBLEMA IDENTIFICADO: Políticas RLS ativas');
        console.log('💡 SOLUÇÃO: Execute os comandos SQL no painel do Supabase');
        console.log('🔗 Link: https://supabase.com/dashboard/project/anpkpsevskdwjismguox');
        return 'RLS_BLOCKED';
      }
      
      return 'CONNECTION_ERROR';
    } else {
      console.log('✅ Conexão básica funcionando');
      return 'OK';
    }
  } catch (e) {
    console.log('💥 Erro crítico:', e);
    return 'CRITICAL_ERROR';
  }
};

export const testTableAccess = async (tableName: string) => {
  console.log(`🧪 Testando acesso à tabela: ${tableName}`);
  
  try {
    // Teste de leitura
    const { data: readData, error: readError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (readError) {
      console.log(`❌ Erro de leitura em ${tableName}:`, {
        code: readError.code,
        message: readError.message
      });
      return false;
    }
    
    console.log(`✅ Leitura OK em ${tableName}`);
    
    // Teste de inserção (apenas para tabelas de teste)
    if (tableName === 'songs') {
      const testSong = {
        title: 'Teste',
        artist: 'Teste',
        icon: '🧪'
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from(tableName)
        .insert([testSong])
        .select()
        .single();
      
      if (insertError) {
        console.log(`❌ Erro de inserção em ${tableName}:`, {
          code: insertError.code,
          message: insertError.message
        });
        return false;
      }
      
      console.log(`✅ Inserção OK em ${tableName}`);
      
      // Remover o registro de teste
      if (insertData?.id) {
        await supabase.from(tableName).delete().eq('id', insertData.id);
        console.log(`🗑️ Registro de teste removido`);
      }
    }
    
    return true;
  } catch (e) {
    console.log(`💥 Erro crítico ao testar ${tableName}:`, e);
    return false;
  }
};

export const runFullDiagnosis = async () => {
  console.log('🚀 DIAGNÓSTICO COMPLETO DO SUPABASE');
  console.log('=' .repeat(60));
  
  const connectionStatus = await diagnoseSupabaseIssues();
  
  if (connectionStatus === 'RLS_BLOCKED') {
    console.log('\n🛑 DIAGNÓSTICO: Políticas RLS bloqueando acesso');
    console.log('📋 COMANDOS PARA RESOLVER:');
    console.log('');
    console.log('ALTER TABLE public.memories DISABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE public.songs DISABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE public.final_screen_configs DISABLE ROW LEVEL SECURITY;');
    console.log('');
    console.log('🔗 Execute em: https://supabase.com/dashboard/project/anpkpsevskdwjismguox');
    return;
  }
  
  if (connectionStatus === 'OK') {
    console.log('\n✅ Conexão OK - Testando tabelas individuais...');
    
    const tables = ['memories', 'songs', 'sessions', 'final_screen_configs'];
    const results: Record<string, boolean> = {};
    
    for (const table of tables) {
      results[table] = await testTableAccess(table);
    }
    
    console.log('\n📊 RESULTADOS:');
    Object.entries(results).forEach(([table, status]) => {
      console.log(`${status ? '✅' : '❌'} ${table}: ${status ? 'OK' : 'FALHA'}`);
    });
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('🏁 Diagnóstico concluído');
};

// Exportar para uso no console do navegador
if (typeof window !== 'undefined') {
  (window as any).diagnoseSupabase = runFullDiagnosis;
  (window as any).testTableAccess = testTableAccess;
}