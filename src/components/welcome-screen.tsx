'use client';

import { cn } from '@/lib/utils';
import { SparklesPreview } from './sparkles';
import { SparkleButton } from './ui/sparkle-button';

interface WelcomeScreenProps {
  isVisible: boolean;
  onShowMemories: () => void;
}

const WelcomeScreen = ({ isVisible, onShowMemories }: WelcomeScreenProps) => {
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center items-center text-center p-5 transition-all duration-800 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12 pointer-events-none'
      )}
    >
      <SparklesPreview />
      <div className="absolute bottom-28 text-center">
        <SparkleButton onClick={onShowMemories}>
          Começar
        </SparkleButton>
      </div>
    </div>
  );
};

export default WelcomeScreen;
