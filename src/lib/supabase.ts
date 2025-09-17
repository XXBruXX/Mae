import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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