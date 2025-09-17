-- Configurar políticas RLS para permitir acesso público às tabelas

-- Desabilitar RLS temporariamente para permitir acesso livre (desenvolvimento)
ALTER TABLE public.memories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_screen_configs DISABLE ROW LEVEL SECURITY;

-- OU se preferir manter RLS ativo, criar políticas permissivas para desenvolvimento
-- Políticas para tabela memories
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'memories' AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.memories
            FOR SELECT USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'memories' AND policyname = 'Enable insert access for all users'
    ) THEN
        CREATE POLICY "Enable insert access for all users" ON public.memories
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'memories' AND policyname = 'Enable update access for all users'
    ) THEN
        CREATE POLICY "Enable update access for all users" ON public.memories
            FOR UPDATE USING (true);
    END IF;
END $$;

-- Políticas para tabela songs
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'songs' AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.songs
            FOR SELECT USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'songs' AND policyname = 'Enable insert access for all users'
    ) THEN
        CREATE POLICY "Enable insert access for all users" ON public.songs
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- Políticas para tabela sessions
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'sessions' AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.sessions
            FOR SELECT USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'sessions' AND policyname = 'Enable insert access for all users'
    ) THEN
        CREATE POLICY "Enable insert access for all users" ON public.sessions
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'sessions' AND policyname = 'Enable update access for all users'
    ) THEN
        CREATE POLICY "Enable update access for all users" ON public.sessions
            FOR UPDATE USING (true);
    END IF;
END $$;

-- Políticas para tabela final_screen_configs
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'final_screen_configs' AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.final_screen_configs
            FOR SELECT USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'final_screen_configs' AND policyname = 'Enable insert access for all users'
    ) THEN
        CREATE POLICY "Enable insert access for all users" ON public.final_screen_configs
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'final_screen_configs' AND policyname = 'Enable update access for all users'
    ) THEN
        CREATE POLICY "Enable update access for all users" ON public.final_screen_configs
            FOR UPDATE USING (true);
    END IF;
END $$;