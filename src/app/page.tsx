'use client';

import { useState } from 'react';
import WelcomeScreen from '@/components/welcome-screen';
import MemoriesScreen from '@/components/memories-screen';
import MusicSelectionScreen from '@/components/music-selection-screen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const showWelcome = () => setCurrentScreen('welcome');
  const showMemories = () => setCurrentScreen('memories');
  const showMusic = () => setCurrentScreen('music');

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="relative z-10 h-full">
        <WelcomeScreen
          isVisible={currentScreen === 'welcome'}
          onNavigate={showMusic}
        />
        <MemoriesScreen
          isVisible={currentScreen === 'memories'}
          onShowWelcome={showWelcome}
          onShowMusic={showMusic}
        />
        <MusicSelectionScreen
          isVisible={currentScreen === 'music'}
          onShowMemories={showMemories}
        />
      </div>
    </main>
  );
}
