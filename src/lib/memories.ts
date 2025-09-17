import { supabase } from './supabase';

export type Memory = {
  id: string;
  image: string; // Now this will be an image URL
  text: string;
};

export type NewMemory = Omit<Memory, 'id'>;

export type Song = {
  id: string;
  title: string;
  artist: string;
  icon: string;
  audio_url?: string; // URL do arquivo de áudio
  duration?: number; // Duração em segundos
};

export type NewSong = Omit<Song, 'id'>;

// =================================================================
// TIPOS PARA FINAL SCREEN
// =================================================================
export type Session = {
  id: string;
  user_id?: string;
  title: string;
  custom_message?: string;
  selected_song_id?: string;
  selected_song_title?: string;
  created_at: string;
  updated_at: string;
};

export type NewSession = Omit<Session, 'id' | 'created_at' | 'updated_at'>;

export type FinalScreenConfig = {
  id: string;
  session_id: string;
  custom_message?: string;
  show_music_banner: boolean;
  message_position: 'center' | 'top' | 'bottom';
  created_at: string;
  updated_at: string;
};

export type NewFinalScreenConfig = Omit<FinalScreenConfig, 'id' | 'created_at' | 'updated_at'>;

export const getMemories = async (): Promise<Memory[]> => {
    try {
        const { data, error } = await supabase
            .from('memories')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching memories:', error);
            return [];
        }
        
        return data || [];
    } catch (e) {
        console.error("Error fetching memories: ", e);
        return [];
    }
};

export const addMemory = async (memory: NewMemory) => {
    try {
        const { data, error } = await supabase
            .from('memories')
            .insert([memory])
            .select()
            .single();
        
        if (error) {
            console.error('Error adding memory:', error);
            return null;
        }
        
        return data?.id || null;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

export const getSongs = async (): Promise<Song[]> => {
    try {
        // Primeiro tentar buscar com todos os campos
        let { data, error } = await supabase
            .from('songs')
            .select('id, title, artist, icon, audio_url, duration, created_at')
            .order('created_at', { ascending: false });
        
        // Se der erro, buscar apenas campos básicos e adicionar campos opcionais
        if (error && error.code === '42703') { // column does not exist
            console.log('Campos de áudio não existem, buscando apenas campos básicos');
            const result = await supabase
                .from('songs')
                .select('id, title, artist, icon, created_at')
                .order('created_at', { ascending: false });
                
            if (result.error) {
                console.error('Error fetching songs:', result.error);
                return [];
            }
            
            // Mapear dados adicionando campos opcionais
            data = result.data?.map(song => ({
                ...song,
                audio_url: undefined,
                duration: undefined
            })) || [];
            error = null;
        }
        
        if (error) {
            console.error('Error fetching songs:', error);
            return [];
        }
        
        return data || [];
    } catch(e) {
        console.error("Error fetching songs: ", e);
        return [];
    }
};

export const addSong = async (song: NewSong) => {
    try {
        // Primeiro tentar inserir com todos os campos
        let { data, error } = await supabase
            .from('songs')
            .insert([song])
            .select()
            .single();
        
        // Se der erro, tentar apenas com campos básicos
        if (error && error.code === '42703') { // column does not exist
            console.log('Campos de áudio não existem, inserindo apenas campos básicos');
            const basicSong = {
                title: song.title,
                artist: song.artist,
                icon: song.icon
            };
            
            const result = await supabase
                .from('songs')
                .insert([basicSong])
                .select()
                .single();
                
            data = result.data;
            error = result.error;
        }
        
        if (error) {
            console.error('Error adding song:', error);
            return null;
        }
        
        return data?.id || null;
    } catch (e) {
        console.error("Error adding song: ", e);
        return null;
    }
};

export const initialMemories: Memory[] = [];

// =================================================================
// FUNÇÕES PARA SESSÕES
// =================================================================

/**
 * Criar uma nova sessão (álbum)
 */
export const createSession = async (session: NewSession): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert([session])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating session:', error);
      return null;
    }
    
    return data?.id || null;
  } catch (e) {
    console.error("Error creating session: ", e);
    return null;
  }
};

/**
 * Buscar sessão por ID
 */
export const getSession = async (sessionId: string): Promise<Session | null> => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    if (error) {
      console.error('Error fetching session:', error);
      return null;
    }
    
    return data;
  } catch (e) {
    console.error("Error fetching session: ", e);
    return null;
  }
};

/**
 * Atualizar mensagem personalizada da sessão
 */
export const updateSessionMessage = async (sessionId: string, customMessage: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('sessions')
      .update({ custom_message: customMessage })
      .eq('id', sessionId);
    
    if (error) {
      console.error('Error updating session message:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error("Error updating session message: ", e);
    return false;
  }
};

/**
 * Buscar todas as sessões do usuário
 */
export const getUserSessions = async (userId?: string): Promise<Session[]> => {
  try {
    let query = supabase
      .from('sessions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching user sessions:', error);
      return [];
    }
    
    return data || [];
  } catch (e) {
    console.error("Error fetching user sessions: ", e);
    return [];
  }
};

// =================================================================
// FUNÇÕES PARA CONFIGURAÇÕES DA FINAL SCREEN
// =================================================================

/**
 * Criar configuração para final screen
 */
export const createFinalScreenConfig = async (config: NewFinalScreenConfig): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('final_screen_configs')
      .insert([config])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating final screen config:', error);
      return null;
    }
    
    return data?.id || null;
  } catch (e) {
    console.error("Error creating final screen config: ", e);
    return null;
  }
};

/**
 * Buscar configuração da final screen por sessão
 */
export const getFinalScreenConfig = async (sessionId: string): Promise<FinalScreenConfig | null> => {
  try {
    const { data, error } = await supabase
      .from('final_screen_configs')
      .select('*')
      .eq('session_id', sessionId)
      .single();
    
    if (error) {
      console.error('Error fetching final screen config:', error);
      return null;
    }
    
    return data;
  } catch (e) {
    console.error("Error fetching final screen config: ", e);
    return null;
  }
};

/**
 * Atualizar configuração da final screen
 */
export const updateFinalScreenConfig = async (
  sessionId: string, 
  updates: Partial<NewFinalScreenConfig>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('final_screen_configs')
      .update(updates)
      .eq('session_id', sessionId);
    
    if (error) {
      console.error('Error updating final screen config:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error("Error updating final screen config: ", e);
    return false;
  }
};

// =================================================================
// FUNÇÕES AUXILIARES
// =================================================================

/**
 * Criar sessão completa com configuração padrão
 */
export const createSessionWithDefaults = async (
  title: string = 'Meu Álbum',
  songTitle?: string,
  songId?: string
): Promise<string | null> => {
  try {
    // 1. Criar sessão
    const sessionId = await createSession({
      title,
      selected_song_title: songTitle,
      selected_song_id: songId
    });
    
    if (!sessionId) return null;
    
    // 2. Criar configuração padrão para final screen
    await createFinalScreenConfig({
      session_id: sessionId,
      show_music_banner: true,
      message_position: 'center'
    });
    
    return sessionId;
  } catch (e) {
    console.error("Error creating session with defaults: ", e);
    return null;
  }
};

/**
 * Vincular memórias existentes a uma sessão
 */
export const linkMemoriesToSession = async (memoryIds: string[], sessionId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('memories')
      .update({ session_id: sessionId })
      .in('id', memoryIds);
    
    if (error) {
      console.error('Error linking memories to session:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error("Error linking memories to session: ", e);
    return false;
  }
};

/**
 * Buscar memórias de uma sessão
 */
export const getSessionMemories = async (sessionId: string): Promise<Memory[]> => {
  try {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching session memories:', error);
      return [];
    }
    
    return data || [];
  } catch (e) {
    console.error("Error fetching session memories: ", e);
    return [];
  }
};
