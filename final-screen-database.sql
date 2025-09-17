-- =================================================================
-- SQL PARA FINAL SCREEN - App Mae
-- =================================================================
-- Execute este script no SQL Editor do Supabase
-- Este script cria as tabelas necessárias para a FinalScreen

-- =================================================================
-- 1. TABELA PARA SESSÕES/ÁLBUNS
-- =================================================================
-- Cada sessão representa um álbum completo criado pelo usuário
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT, -- Para futuro sistema de usuários
    title TEXT DEFAULT 'Meu Álbum',
    custom_message TEXT, -- Mensagem personalizada da final screen
    selected_song_id UUID REFERENCES public.songs(id),
    selected_song_title TEXT, -- Cache do título da música
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================================================
-- 2. TABELA PARA CONFIGURAÇÕES DA FINAL SCREEN
-- =================================================================
-- Armazena configurações específicas da tela final
CREATE TABLE IF NOT EXISTS public.final_screen_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
    custom_message TEXT, -- Mensagem personalizada exibida
    show_music_banner BOOLEAN DEFAULT true, -- Se mostra o banner "Tocando Agora"
    message_position TEXT DEFAULT 'center', -- center, top, bottom
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================================================
-- 3. VINCULAR MEMÓRIAS ÀS SESSÕES
-- =================================================================
-- Adicionar coluna session_id à tabela memories (se não existir)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'memories' 
        AND column_name = 'session_id'
    ) THEN
        ALTER TABLE public.memories ADD COLUMN session_id UUID REFERENCES public.sessions(id);
    END IF;
END $$;

-- =================================================================
-- 4. ÍNDICES PARA PERFORMANCE
-- =================================================================
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON public.sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_final_configs_session_id ON public.final_screen_configs(session_id);
CREATE INDEX IF NOT EXISTS idx_memories_session_id ON public.memories(session_id);

-- =================================================================
-- 5. TRIGGERS PARA UPDATED_AT
-- =================================================================
-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para as novas tabelas
DROP TRIGGER IF EXISTS update_sessions_updated_at ON public.sessions;
CREATE TRIGGER update_sessions_updated_at 
    BEFORE UPDATE ON public.sessions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_final_configs_updated_at ON public.final_screen_configs;
CREATE TRIGGER update_final_configs_updated_at 
    BEFORE UPDATE ON public.final_screen_configs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =================================================================
-- 6. RLS (ROW LEVEL SECURITY) - Para futuro sistema de usuários
-- =================================================================
-- Habilitar RLS nas novas tabelas
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_screen_configs ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Allow public access to sessions" ON public.sessions;
DROP POLICY IF EXISTS "Allow public access to final_configs" ON public.final_screen_configs;

-- Políticas básicas (permitir acesso público por enquanto)
CREATE POLICY "Allow public access to sessions" 
    ON public.sessions FOR ALL 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Allow public access to final_configs" 
    ON public.final_screen_configs FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- =================================================================
-- 7. DADOS DE EXEMPLO PARA TESTE
-- =================================================================
-- Inserir uma sessão de exemplo
INSERT INTO public.sessions (title, custom_message, selected_song_title) 
VALUES ('Sessão de Teste', 'Esta é uma mensagem personalizada de exemplo!', 'Música Exemplo')
ON CONFLICT DO NOTHING;

-- =================================================================
-- 8. VERIFICAR ESTRUTURA DAS TABELAS
-- =================================================================
-- Query para verificar se tudo foi criado corretamente
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name IN ('sessions', 'final_screen_configs', 'memories', 'songs')
ORDER BY table_name, ordinal_position;

-- =================================================================
-- FINALIZADO! 
-- =================================================================
-- Este script criou:
-- ✅ Tabela sessions (álbuns/sessões)
-- ✅ Tabela final_screen_configs (configurações da tela final)
-- ✅ Vinculação de memories às sessions
-- ✅ Índices para performance
-- ✅ Triggers para updated_at
-- ✅ Políticas de segurança básicas
-- ✅ Dados de exemplo para teste