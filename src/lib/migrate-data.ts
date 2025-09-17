// Script de migração de dados do Firebase para Supabase
// Execute este script apenas uma vez durante a migração

import { supabase } from './supabase';

// Dados do Firebase (copie seus dados aqui manualmente)
// Ou use o Firebase Admin SDK para exportar os dados automaticamente

interface FirebaseMemory {
  id: string;
  image: string;
  text: string;
}

interface FirebaseSong {
  id: string;
  title: string;
  artist: string;
  icon: string;
}

// Dados de exemplo - substitua pelos seus dados reais do Firebase
const firebaseMemories: FirebaseMemory[] = [
  // Adicione seus dados aqui
  // Exemplo:
  // {
  //   id: "firebase-id-1",
  //   image: "url-da-imagem",
  //   text: "Texto da memória"
  // }
];

const firebaseSongs: FirebaseSong[] = [
  // Adicione seus dados aqui
  // Exemplo:
  // {
  //   id: "firebase-id-1", 
  //   title: "Nome da música",
  //   artist: "Nome do artista",
  //   icon: "🎵"
  // }
];

export async function migrateMemories() {
  console.log('🔄 Iniciando migração de memórias...');
  
  try {
    for (const memory of firebaseMemories) {
      const { error } = await supabase
        .from('memories')
        .insert({
          image: memory.image,
          text: memory.text
        });
      
      if (error) {
        console.error(`❌ Erro ao migrar memória ${memory.id}:`, error);
      } else {
        console.log(`✅ Memória migrada: ${memory.id}`);
      }
    }
    
    console.log('✅ Migração de memórias concluída!');
  } catch (error) {
    console.error('❌ Erro na migração de memórias:', error);
  }
}

export async function migrateSongs() {
  console.log('🔄 Iniciando migração de músicas...');
  
  try {
    for (const song of firebaseSongs) {
      const { error } = await supabase
        .from('songs')
        .insert({
          title: song.title,
          artist: song.artist,
          icon: song.icon
        });
      
      if (error) {
        console.error(`❌ Erro ao migrar música ${song.id}:`, error);
      } else {
        console.log(`✅ Música migrada: ${song.id}`);
      }
    }
    
    console.log('✅ Migração de músicas concluída!');
  } catch (error) {
    console.error('❌ Erro na migração de músicas:', error);
  }
}

export async function migrateAllData() {
  console.log('🚀 Iniciando migração completa do Firebase para Supabase...');
  
  await migrateMemories();
  await migrateSongs();
  
  console.log('🎉 Migração completa finalizada!');
}

// Execute a migração (descomente para usar)
// migrateAllData();