-- =================================================================
-- SQL CORRIGIDO PARA FINAL SCREEN - App Mae
-- =================================================================
-- Execute este script no SQL Editor do Supabase
-- Versão sem IF NOT EXISTS para evitar erros de sintaxe

-- =================================================================
-- 1. ADICIONAR CAMPOS DE ÁUDIO ÀS MÚSICAS (ESSENCIAL)
-- =================================================================
DO $$ 
BEGIN
    -- Adicionar campo audio_url
    BEGIN
        ALTER TABLE public.songs ADD COLUMN audio_url TEXT;
        RAISE NOTICE 'Coluna audio_url adicionada com sucesso';
    EXCEPTION 
        WHEN duplicate_column THEN 
            RAISE NOTICE 'Coluna audio_url já existe';
    END;
    
    -- Adicionar campo duration
    BEGIN
        ALTER TABLE public.songs ADD COLUMN duration INTEGER DEFAULT 0;
        RAISE NOTICE 'Coluna duration adicionada com sucesso';
    EXCEPTION 
        WHEN duplicate_column THEN 
            RAISE NOTICE 'Coluna duration já existe';
    END;
END $$;

-- =================================================================
-- 2. TABELA PARA SESSÕES/ÁLBUNS
-- =================================================================
DO $$
BEGIN
    CREATE TABLE public.sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT,
        title TEXT DEFAULT 'Meu Álbum',
        custom_message TEXT,
        selected_song_id UUID,
        selected_song_title TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    RAISE NOTICE 'Tabela sessions criada com sucesso';
EXCEPTION
    WHEN duplicate_table THEN
        RAISE NOTICE 'Tabela sessions já existe';
END $$;

-- =================================================================
-- 3. TABELA PARA CONFIGURAÇÕES DA FINAL SCREEN
-- =================================================================
DO $$
BEGIN
    CREATE TABLE public.final_screen_configs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID,
        custom_message TEXT,
        show_music_banner BOOLEAN DEFAULT true,
        message_position TEXT DEFAULT 'center',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    RAISE NOTICE 'Tabela final_screen_configs criada com sucesso';
EXCEPTION
    WHEN duplicate_table THEN
        RAISE NOTICE 'Tabela final_screen_configs já existe';
END $$;

-- =================================================================
-- 4. VINCULAR MEMÓRIAS ÀS SESSÕES
-- =================================================================
DO $$ 
BEGIN
    ALTER TABLE public.memories ADD COLUMN session_id UUID;
    RAISE NOTICE 'Coluna session_id adicionada à tabela memories';
EXCEPTION 
    WHEN duplicate_column THEN 
        RAISE NOTICE 'Coluna session_id já existe na tabela memories';
END $$;

-- =================================================================
-- 5. FUNÇÃO PARA UPDATED_AT
-- =================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =================================================================
-- 6. TRIGGERS PARA UPDATED_AT (apenas se tabelas existirem)
-- =================================================================
DO $$
BEGIN
    -- Trigger para sessions
    DROP TRIGGER IF EXISTS update_sessions_updated_at ON public.sessions;
    CREATE TRIGGER update_sessions_updated_at 
        BEFORE UPDATE ON public.sessions 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();
    RAISE NOTICE 'Trigger criado para sessions';
EXCEPTION
    WHEN undefined_table THEN
        RAISE NOTICE 'Tabela sessions não existe ainda';
END $$;

DO $$
BEGIN
    -- Trigger para final_screen_configs
    DROP TRIGGER IF EXISTS update_final_configs_updated_at ON public.final_screen_configs;
    CREATE TRIGGER update_final_configs_updated_at 
        BEFORE UPDATE ON public.final_screen_configs 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();
    RAISE NOTICE 'Trigger criado para final_screen_configs';
EXCEPTION
    WHEN undefined_table THEN
        RAISE NOTICE 'Tabela final_screen_configs não existe ainda';
END $$;

-- =================================================================
-- 7. ÍNDICES PARA PERFORMANCE
-- =================================================================
DO $$
BEGIN
    CREATE INDEX idx_sessions_created_at ON public.sessions(created_at DESC);
    CREATE INDEX idx_sessions_user_id ON public.sessions(user_id);
    CREATE INDEX idx_final_configs_session_id ON public.final_screen_configs(session_id);
    CREATE INDEX idx_memories_session_id ON public.memories(session_id);
    RAISE NOTICE 'Índices criados com sucesso';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Alguns índices podem já existir';
END $$;

-- =================================================================
-- 8. VERIFICAR ESTRUTURA DAS TABELAS
-- =================================================================
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
-- Este script criou/atualizou:
-- ✅ Campos audio_url e duration na tabela songs
-- ✅ Tabela sessions (álbuns/sessões)
-- ✅ Tabela final_screen_configs (configurações da tela final)
-- ✅ Coluna session_id na tabela memories
-- ✅ Índices para performance
-- ✅ Triggers para updated_at
-- ✅ Verificação da estrutura das tabelas