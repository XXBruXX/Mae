-- Script para corrigir a tabela songs
-- Execute no SQL Editor do Supabase

ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS duration INTEGER DEFAULT 0;

-- Verificar estrutura
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'songs' AND table_schema = 'public';