-- Criação das tabelas para migração do Firebase para Supabase
-- Execute este script no SQL Editor do Supabase

-- Ativar RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Criar tabela de memórias
CREATE TABLE IF NOT EXISTS public.memories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    image TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de músicas
CREATE TABLE IF NOT EXISTS public.songs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    icon TEXT NOT NULL,
    audio_url TEXT, -- URL do arquivo de áudio
    duration INTEGER DEFAULT 0, -- Duração em segundos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_memories_updated_at 
    BEFORE UPDATE ON public.memories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_songs_updated_at 
    BEFORE UPDATE ON public.songs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permitir todas as operações por enquanto)
-- Em produção, você deve configurar políticas mais restritivas
CREATE POLICY "Enable all operations for memories" ON public.memories
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for songs" ON public.songs
    FOR ALL USING (true) WITH CHECK (true);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS memories_created_at_idx ON public.memories(created_at);
CREATE INDEX IF NOT EXISTS songs_created_at_idx ON public.songs(created_at);

-- Comentários nas tabelas
COMMENT ON TABLE public.memories IS 'Tabela para armazenar memórias dos usuários';
COMMENT ON TABLE public.songs IS 'Tabela para armazenar músicas associadas às memórias';

-- Dados de exemplo (opcional)
INSERT INTO public.songs (title, artist, icon, audio_url) VALUES
    ('Imagine', 'John Lennon', '🎵', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'),
    ('Bohemian Rhapsody', 'Queen', '🎸', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'),
    ('Hotel California', 'Eagles', '🏨', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3')
ON CONFLICT DO NOTHING;