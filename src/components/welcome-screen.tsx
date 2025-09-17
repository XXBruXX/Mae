'use client';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { SparklesPreview } from './sparkles';

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
      <div className="absolute bottom-20 text-center">
        <Button
          onClick={onShowMemories}
          className="bg-gradient-to-r from-gray-300 via-gray-100 to-white text-black px-8 py-6 rounded-full text-base font-semibold shadow-[0_8px_25px_rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out hover:shadow-[0_12px_35px_rgba(255,255,255,0.3)] hover:-translate-y-1 relative overflow-hidden group"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:animate-shine" />
          Clique para ver nossas memórias
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
