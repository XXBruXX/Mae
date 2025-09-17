'use client';

import { useState } from 'react';
import WelcomeScreen from '@/components/welcome-screen';
import MemoriesScreen from '@/components/memories-screen';
import MusicSelectionScreen from '@/components/music-selection-screen';
import FinalScreen from '@/components/final-screen';
import AddMemoriesScreen from '@/components/add-memories-screen';
import CreateMemoryScreen from '@/components/create-memory-screen';
import { type NewMemory } from '@/lib/memories';

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
  const [sessionMemories, setSessionMemories] = useState<NewMemory[]>([]);

  const navigateTo = (screen: Screen) => setCurrentScreen(screen);

  const handleMusicSelection = (songTitle?: string) => {
    setSelectedSongTitle(songTitle);
    navigateTo('final');
  };

  const handleAddCard = (newMemory: NewMemory) => {
    setSessionMemories(prev => [...prev, newMemory]);
    navigateTo('memories.add');
  };

  const handleFinishAdding = () => {
    setSessionMemories([]);
    navigateTo('memories');
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
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
          onFinish={handleFinishAdding}
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
