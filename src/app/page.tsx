'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/welcome-screen';
import MemoriesScreen from '@/components/memories-screen';
import MusicSelectionScreen from '@/components/music-selection-screen';
import FinalScreen from '@/components/final-screen';
import AddMemoriesScreen from '@/components/add-memories-screen';
import CreateMemoryScreen from '@/components/create-memory-screen';
import GlobalAudioPlayer from '@/components/global-audio-player';
import { type NewMemory, type Song, getSongs } from '@/lib/memories';

export type Screen = 
  | 'welcome' 
  | 'music' 
  | 'final' 
  | 'memories' 
  | 'memories.add' 
  | 'memories.create';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedSongTitle, setSelectedSongTitle] = useState<string | undefined>(undefined);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
  const [sessionMemories, setSessionMemories] = useState<NewMemory[]>([]);
  const [isEditMode, setIsEditMode] = useState(true); // Controla se está no modo de edição

  const navigateTo = (screen: Screen) => setCurrentScreen(screen);

  const handleMusicSelection = async (songTitle?: string) => {
    setSelectedSongTitle(songTitle);
    
    // Buscar o objeto completo da música
    if (songTitle) {
      try {
        const songs = await getSongs();
        const song = songs.find(s => s.title === songTitle);
        setSelectedSong(song);
      } catch (error) {
        console.error('Erro ao buscar dados da música:', error);
      }
    }
    
    navigateTo('final');
  };

  const handleAddCard = (newMemory: NewMemory) => {
    setSessionMemories(prev => [...prev, newMemory]);
    navigateTo('memories.add');
  };

  const handleFinishAdding = () => {
    if (sessionMemories.length > 0) {
      // Se há memórias, primeiro mostra elas salvas (modo visualização)
      setIsEditMode(false);
    } else {
      // Se não há memórias, vai direto para o álbum
      setSessionMemories([]);
      navigateTo('memories');
    }
  }
  
  const handleFinalFinish = () => {
    // Quando clica "Ver Álbum Completo" após salvar
    setSessionMemories([]);
    setIsEditMode(true); // Reset para próxima vez
    navigateTo('memories');
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Player de áudio global */}
      <GlobalAudioPlayer 
        song={selectedSong}
        isActive={currentScreen === 'final' || currentScreen === 'memories'}
        volume={0.3}
      />
      
      <div className="relative z-10 h-full">
        <WelcomeScreen
          isVisible={currentScreen === 'welcome'}
          onNavigate={() => navigateTo('music')}
        />
        <MusicSelectionScreen
          isVisible={currentScreen === 'music'}
          onShowWelcome={() => navigateTo('welcome')}
          onChoose={handleMusicSelection}
        />
        <FinalScreen
          isVisible={currentScreen === 'final'}
          songTitle={selectedSongTitle}
          onNavigate={() => navigateTo('memories')}
        />
        <MemoriesScreen
          isVisible={currentScreen === 'memories'}
          songTitle={selectedSongTitle}
          onShowFinal={() => navigateTo('final')}
          onShowWelcome={() => navigateTo('welcome')}
          onAddMemory={() => navigateTo('memories.add')}
        />
        <AddMemoriesScreen
          isVisible={currentScreen === 'memories.add'}
          sessionMemories={sessionMemories}
          onAddCard={() => navigateTo('memories.create')}
          onFinish={isEditMode ? handleFinishAdding : handleFinalFinish}
          isEditMode={isEditMode}
        />
        <CreateMemoryScreen
          isVisible={currentScreen === 'memories.create'}
          onSave={handleAddCard}
          onCancel={() => navigateTo('memories.add')}
        />
      </div>
    </main>
  );
}
