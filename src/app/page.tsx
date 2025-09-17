'use client';

import { useState } from 'react';
import WelcomeScreen from '@/components/welcome-screen';
import MemoriesScreen from '@/components/memories-screen';

export default function Home() {
  const [isMemoriesVisible, setMemoriesVisible] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="relative z-10 h-full">
        <WelcomeScreen
          isVisible={!isMemoriesVisible}
          onShowMemories={() => setMemoriesVisible(true)}
        />
        <MemoriesScreen
          isVisible={isMemoriesVisible}
          onShowWelcome={() => setMemoriesVisible(false)}
        />
      </div>
    </main>
  );
}
