-- Script para adicionar campos de áudio à tabela songs existente
-- Execute este script no SQL Editor do Supabase

-- Adicionar coluna audio_url se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'songs' 
        AND column_name = 'audio_url'
    ) THEN
        ALTER TABLE public.songs ADD COLUMN audio_url TEXT;
    END IF;
END $$;

-- Adicionar coluna duration se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'songs' 
        AND column_name = 'duration'
    ) THEN
        ALTER TABLE public.songs ADD COLUMN duration INTEGER DEFAULT 0;
    END IF;
END $$;

-- Atualizar dados existentes com URLs de exemplo
UPDATE public.songs 
SET audio_url = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'
WHERE audio_url IS NULL;