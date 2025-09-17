import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://anpkpsevskdwjismguox.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucGtwc2V2c2tkd2ppc21ndW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MDY5MDEsImV4cCI6MjA1Mjk4MjkwMX0.-7Yq-0UQl1rnswJYvFnJX4PfgQWmTh8n3Zy8g6rQtpM'

// Verificar se as variáveis estão configuradas corretamente
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Configuração do Supabase não encontrada. Usando valores padrão.')
} else {
  console.log('Supabase configurado com sucesso:', { url: supabaseUrl, hasKey: !!supabaseAnonKey })
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Para desenvolvimento, não persistir sessão
    autoRefreshToken: false
  }
})

// Tipos do banco de dados
export type Database = {
  public: {
    Tables: {
      memories: {
        Row: {
          id: string
          image: string
          text: string
          session_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          image: string
          text: string
          session_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          image?: string
          text?: string
          session_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      songs: {
        Row: {
          id: string
          title: string
          artist: string
          icon: string
          audio_url?: string
          duration?: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          artist: string
          icon: string
          audio_url?: string
          duration?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          artist?: string
          icon?: string
          audio_url?: string
          duration?: number
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id?: string
          title: string
          custom_message?: string
          selected_song_id?: string
          selected_song_title?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          title: string
          custom_message?: string
          selected_song_id?: string
          selected_song_title?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          custom_message?: string
          selected_song_id?: string
          selected_song_title?: string
          created_at?: string
          updated_at?: string
        }
      }
      final_screen_configs: {
        Row: {
          id: string
          session_id: string
          custom_message?: string
          show_music_banner: boolean
          message_position: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          custom_message?: string
          show_music_banner?: boolean
          message_position?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          custom_message?: string
          show_music_banner?: boolean
          message_position?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}