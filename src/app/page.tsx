'use client';

import { useState } from 'react';
import WelcomeScreen from '@/components/welcome-screen';
import MemoriesScreen from '@/components/memories-screen';
import MusicSelectionScreen from '@/components/music-selection-screen';
import FinalScreen from '@/components/final-screen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedSongTitle, setSelectedSongTitle] = useState<string | undefined>(undefined);

  const showWelcome = () => setCurrentScreen('welcome');
  const showMusic = () => setCurrentScreen('music');
  const showMemories = () => {
    setCurrentScreen('memories');
  };
  const showFinal = (songTitle?: string) => {
    setSelectedSongTitle(songTitle);
    setCurrentScreen('final');
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="relative z-10 h-full">
        <WelcomeScreen
          isVisible={currentScreen === 'welcome'}
          onNavigate={showMusic}
        />
        <MusicSelectionScreen
          isVisible={currentScreen === 'music'}
          onShowWelcome={showWelcome}
          onShowMemories={showFinal}
        />
        <FinalScreen
          isVisible={currentScreen === 'final'}
          songTitle={selectedSongTitle}
          onNavigate={showMemories}
        />
        <MemoriesScreen
          isVisible={currentScreen === 'memories'}
          songTitle={selectedSongTitle}
          onShowMusic={showMusic}
          onShowFinal={showWelcome}
        />
      </div>
    </main>
  );
}
