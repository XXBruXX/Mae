'use client';

import { useState, useRef, useEffect } from 'react';

interface UseAudioPlayerProps {
  url?: string;
  volume?: number;
  loop?: boolean;
}

export const useAudioPlayer = ({ 
  url, 
  volume = 0.3, 
  loop = true 
}: UseAudioPlayerProps = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      audioRef.current = new Audio(url);
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
      audioRef.current.preload = 'metadata';

      const audio = audioRef.current;

      const handleLoadStart = () => setIsLoading(true);
      const handleLoadedData = () => {
        setIsLoading(false);
        setDuration(audio.duration);
        setError(null);
      };
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleEnded = () => setIsPlaying(false);
      const handleError = () => {
        setIsLoading(false);
        setError('Erro ao carregar áudio');
        setIsPlaying(false);
      };

      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.pause();
        audio.src = '';
      };
    }
  }, [url, volume, loop]);

  const play = async () => {
    if (audioRef.current && !isLoading) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setError(null);
      } catch (err) {
        setError('Erro ao reproduzir áudio');
        setIsPlaying(false);
        console.error('Erro ao reproduzir áudio:', err);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  const seek = (time: number) => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, time));
    }
  };

  return {
    isPlaying,
    isLoading,
    duration,
    currentTime,
    error,
    play,
    pause,
    stop,
    setVolume,
    seek,
  };
};